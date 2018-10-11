const express = require('express');
const PORT = process.env.PORT || 9000;
const server = express();
const { resolve } = require('path');
const cors = require('cors');
const mysql = require('mysql');
const sqrlDbCreds = require('./sqrlDbCreds');
const session = require('express-session');
const sessionParams = require('./sessionParams');
const sessionExec = session(sessionParams);
const functions = require("./serverFunctions.js");

server.use(express.static(resolve(__dirname, 'client', 'dist')));
server.use(cors());
server.use(express.json());
server.use(sessionExec);

server.post('/api/checkLoginStatus', (request, response) => {
    const {userId} = request.body;
    const output = {
        success: true,
    }
    if (request.session.userId === userId){
        output.loggedIn = true;
    }
    else{
        output.loggedIn = false;
    };
    response.status(200).send(output);
});

server.post('/api/login', (request, response) => {
    const {userName, password} = request.body;
    const output = {
        success: false,
        loggedIn: false
    };

    let userNameRegEx = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
    let passwordRegEx = /^(?=[a-zA-Z])(?=.{8,32}$)(?=.*[A-Z])(?=.*[a-z]).*$/;

    if (userNameRegEx.test(userName) && passwordRegEx.test(password)){
        const status = 'active';
        const connection = mysql.createConnection(sqrlDbCreds);
        connection.query("SELECT users.ID FROM users WHERE users.username=? AND users.password=SHA1(?) AND users.status=?",
                        [userName, password, status],
                        (error, rows) => {
                            output.success = true;
                            if (error){
                                output.error = error;
                                response.status(400).send(output);
                            }else if (rows){
                                output.userId = rows[0].ID;
                                output.loggedIn = true;
                                request.session.userId = output.userId;
                                response.status(200).send(output);
                            }   
        });
    }else{
        output.error = 'User name or password incorrect.';
        response.status(401).send(output);
    }
});

server.post('/api/logout', (request, response) => {
    const {userId} = request.body;
    const output = {
        success: true,
        loggedIn: null
    };
    if (request.session.userId && request.session.userId === userId){
        request.session.destroy();
        output.loggedIn = false;
        response.status(200).send(output);
    }else{
        response.status(400).send(output);
    }
});

server.post('/api/addTag', (request, response) => {
    const {userId, tagName} = request.body;
    console.log("request data: ", request.body);
    const output = {
        success: false
    };
    if (!request.session.userId){
        console.log('could not find login data. loggedInID is false');
        response.status(401).send(output);
    }else{
        let userIdRegEx = /^[1-9][\d]*$/;
        let tagNameRegEx = /^[a-zA-Z \d-_]{2,}$/;

        if (userIdRegEx.test(userId) && tagNameRegEx.test(tagName)){
            const connection = mysql.createConnection(sqrlDbCreds);
            connection.query(
                "SELECT tagName, userId FROM tags WHERE userId = ? AND tagName = ?",
                [userId, tagName],
                (error, rows) => {
                    console.log('look up tag query made', rows, rows.length);
                    if (error){
                        console.log('look up query error', error);
                        output.error = error;
                        response.send(output);
                    }else if(rows.length===0){
                        connection.query(
                            "INSERT INTO tags (userId, tagName) VALUES (?, ?);",
                            [userId, tagName],
                            (error, result) => {
                                console.log('insert query made');
                                if (error){
                                console.log('insert query error', error);
                                output.error = error;
                                response.send(output);
                                }
                                output.success = true;
                                connection.end(() => {
                                    console.log('connection end');
                                });                        
                                response.send(output);
                            }
                        );
                    }
                    else{
                        output.error = "tagName exists already";
                        response.send(output);
                    }
                    
                }
            );
        }
        else{
            output.error = "userId or tagName invalid";
            response.send(output);
        }
    }
});

server.post('/api/getUserTags', (request, response) => {
    const {userId} = request.body;
    console.log("request data: ", request.body);
    
    const output = {
        tags: [],
        success: false
    };

    let userIdRegEx = /^[1-9][\d]*/;

    if (userIdRegEx.test(userId)){
        const connection = mysql.createConnection(sqrlDbCreds);
        connection.query("SELECT tagName FROM tags WHERE userId = ?",
                        [userId],
                        (error, rows) => {
                            console.log('get tags query made');
                            if (error){
                                console.log('get tags query error', error);
                                response.send(output);
                            }
                            rows.forEach(element => {
                                output.tags.push(element);
                            });
                            output.success = true;
                            connection.end(() => {
                                console.log('connection end');
                            });                        
                            response.send(output);
                        }
        );
    }else{
        response.send(output);
    }
});

server.post('/api/getUserReceipts', (request, response) => {
    const {userId} = request.body;
    const output = {
        receipts: [],
        success: false
    };
    if (request.session.userId === userId){
        const connection = mysql.createConnection(sqrlDbCreds);
        connection.query("SELECT receipts.ID, receipts.purchaseDate, receipts.storeName, receipts.total FROM receipts WHERE receipts.userId = ? AND receipts.status = 'active';",
                        [userId],
                        (error, rows) => {
                            if (error){
                                output.error = error;
                                response.status(400).send(output);
                            }else if(rows){
                                rows.forEach(element => {
                                    output.receipts.push(element);
                                });
                                output.success = true;
                                connection.end();                     
                                response.status(200).send(output);
                            }
        });
    }else{
        output.error = "User not logged in.";
        response.status(401).send(output);
    }
});

server.post('/api/deleteReceipt', (request, response) => {
    // NOTE: This query is meant for doing a SOFT delete meaning the receipts status will be update to 'inactive' and will NOT be removed from the db
    const {userId, receiptId} = request.body;
    const output = {
        success: false
    };
    if(request.session.userId === userId){
        const connection = mysql.createConnection(sqrlDbCreds);
        connection.query("UPDATE receipts SET receipts.status = 'inactive' WHERE receipts.ID = ?;",
                        [receiptId],
                        (error) => {
                            if (error){
                                output.error = error;
                                response.status(400).send(output);
                            }else{
                                output.success = true;
                                connection.end();                        
                                response.status(200).send(output);
                            }
                            
        });
    }else{
        output.error = "User not logged in.";
        response.status(401).send(output);
    }
});

server.post('/api/getReceipt', (request, response) => {
    const {userId, receiptId} = request.body;
    const output = {
        success: false
    };
    if (request.session.userId === userId){
        const connection = mysql.createConnection(sqrlDbCreds);
        output.tags = functions.getTagsForReceipt(receiptId, connection);
        connection.query("SELECT receipts.ID, receipts.storeName, receipts.total, receipts.tax, receipts.creditCardName, receipts.creditCardDigits, receipts.purchaseDate, receipts.category, receipts.comment, receipts.reimbursable FROM receipts WHERE receipts.ID = ?;",
                    [receiptId],
                    (error, rows) => {
                        if (error){
                            output.error = error;
                            response.status(400).send(output);
                        }else if(rows){
                            output.receipt = rows[0];
                            output.success = true;
                            connection.end();                        
                            response.status(200).send(output);
                        }
        });
    }else{
        output.error = "User not logged in.";
        response.status(401).send(output);
    }
});

server.post('/api/addReceipt', (request, response) => {
    const {userId, storeName, total, tax=0, creditCardName=null, creditCardDigits=null, purchaseDate=functions.getCurrentDate(), category=null, comment=null, reimbursable=0} = request.body;
    console.log("request data: ", request.body);

    const output = {
        success: false
    };

    let userIdRegex = /^[1-9][\d]*$/;
    let storeNameRegex = /^[a-zA-Z \d-_]{2,}$/;
    let totalRegex = /^[1-9][\d]*$/;
    let taxRegex = /^[1-9][\d]*$/;
    let creditCardNameRegex = /^[a-zA-Z ]{2,}$/;
    let creditCardDigitsRegex = /^[\d]{4}$/;
    let purchaseDateRegex = /^\d{4}-{1}\d{2}-{1}\d{2}$/;
    let categoryRegex = /^[a-zA-Z]$/;
    let commentRegex = /^[a-zA-Z\d .\-*\/$%!?()+=]$/;
    let reimbursableRegex = /^[01]{1}$/;

    // Validating required input data
    if(userIdRegex.test(userId) && storeNameRegex.test(storeName) && totalRegex.test(total) && purchaseDateRegex.test(purchaseDate)){

        // Validating optional input data
        if((taxRegex.test(tax) || tax===0) && (creditCardNameRegex.test(creditCardName) || creditCardName===null) && (creditCardDigitsRegex.test(creditCardDigits) || creditCardDigits===null) 
            && (categoryRegex.test(category) || category===null) && (commentRegex.test(comment) || comment===null) && (reimbursableRegex.test(reimbursable) || reimbursable===0)){
            
            const connection = mysql.createConnection(sqrlDbCreds);
            connection.query("INSERT INTO receipts (userId, storeName, total, tax, creditCardName, creditCardDigits, purchaseDate, category, comment, reimbursable) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
                            [userId, storeName, total, tax, creditCardName, creditCardDigits, purchaseDate, category, comment, reimbursable],
                            (error, result) => {
                                console.log('add receipt query made');
                                if(error){
                                    console.log('add receipt query error', error);
                                    response.send(output);
                                }
                                output.success = true;
                                connection.end(() => { console.log('connection end'); });
                                response.send(output);
                            }
            );
        }
        else{
            output.error = 'optional input data --invalid (add receipt)';
            response.send(output);
        }
    }
    else{
        output.error = 'required input data --invalid (add receipt)';
        response.send(output);
    }
});

server.post('/api/updateReceipt', (request, response) => {
    const {receiptId, storeName, total, tax=0, creditCardName=null, creditCardDigits=null, purchaseDate=functions.getCurrentDate(), category=null, comment=null, reimbursable=0} = request.body;
    console.log("request data: ", request.body);
    
    const output = {
        success: false
    };

    let receiptIdRegex = /^[1-9][\d]*$/;
    let storeNameRegex = /^[a-zA-Z \d-_]{2,}$/;
    let totalRegex = /^[1-9][\d]*$/;
    let taxRegex = /^[1-9][\d]*$/;
    let creditCardNameRegex = /^[a-zA-Z ]{2,}$/;
    let creditCardDigitsRegex = /^[\d]{4}$/;
    let purchaseDateRegex = /^\d{4}-{1}\d{2}-{1}\d{2}$/;
    let categoryRegex = /^[a-zA-Z]$/;
    let commentRegex = /^[a-zA-Z\d .\-*\/$%!?()+=]$/;
    let reimbursableRegex = /^[01]{1}$/;

    // Validating required input data
    if(receiptIdRegex.test(receiptId) && storeNameRegex.test(storeName) && totalRegex.test(total) && purchaseDateRegex.test(purchaseDate)){

        // Validating optional input data
        if((taxRegex.test(tax) || tax===0) && (creditCardNameRegex.test(creditCardName) || creditCardName===null) && (creditCardDigitsRegex.test(creditCardDigits) || creditCardDigits===null) 
            && (categoryRegex.test(category) || category===null) && (commentRegex.test(comment) || comment===null) && (reimbursableRegex.test(reimbursable) || reimbursable===0)){
            
            const connection = mysql.createConnection(sqrlDbCreds);
            connection.query("UPDATE receipts SET receipts.storeName = ?, receipts.total = ?, receipts.tax = ?, receipts.creditCardName = ?, receipts.creditCardDigits = ?, receipts.purchaseDate = ?, receipts.category = ?, receipts.comment = ?, receipts.reimbursable = ?  WHERE receipts.ID = ?;",
                            [storeName, total, tax, creditCardName, creditCardDigits, purchaseDate, category, comment, reimbursable, receiptId],
                            (error, result) => {
                                console.log('update receipt query sent');
                                if(error){
                                    console.log('update receipt query error', error);
                                    response.send(output);
                                }
                                output.success = true;
                                connection.end(() => { console.log('connection end'); });
                                response.send(output);
                            }
            );
        }
        else{
            output.error = 'optional input data --invalid';
            response.send(output);
        }
    }
    else{
        output.error = 'required input data --invalid';
        response.send(output);
    }
});

server.get('*', (request, response) => {
    response.sendFile(resolve(__dirname, 'client', 'dist', 'index.html')); // resolve ensures a correct path
});

server.listen(PORT, () => {
    console.log('server listening on port ' + PORT);
});
