const express = require('express');
const PORT = process.env.PORT || 9000;
const server = express();
const { resolve } = require('path'); // path is a module included with node
const cors = require('cors');
const mysql = require('mysql');
const sqrlDbCreds = require('./sqrlDbCreds');
const session = require('express-session');
const sessionParams = require('./sessionParams');
const sessionExec = session(sessionParams);

server.use(express.static(resolve(__dirname, 'client', 'dist')));
server.use(cors()); // allows cross origin
server.use(express.json()); // replaces body parser
server.use(sessionExec);


server.post('/api/login', (request, response) => {
    const {userName, password} = request.body;
    const status = 'active';
    console.log("login request data: ", request.body);
    
    const output = {
        success: false,
        loggedIn: false
    };

    let userNameRegEx = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
    let passwordRegEx = /^(?=[a-zA-Z])(?=.{8,32}$)(?=.*[A-Z])(?=.*[a-z]).*$/;

    if (userNameRegEx.test(userName) && passwordRegEx.test(password)){
        console.log('regEx matched');
        const connection = mysql.createConnection(sqrlDbCreds);
        connection.query("SELECT users.ID FROM users WHERE users.username=? AND users.password=SHA1(?) AND users.status=?",
                    [userName, password, status],
                    (error, rows) => {
                        console.log('login query made');
                        if (error){
                            console.log('login query error', error);
                            response.send(output);
                        }else if (rows){
                            output.userId = rows[0].ID;
                            output.success = true;
                            output.sessionID = request.sessionID;
                            const ipAddress = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
                            connection.query("INSERT INTO connections(userId, ipAddress, sessionID, created, lastConnection) VALUES (?,?,?,NOW(),NOW())",
                                            [output.userId, ipAddress, output.sessionID],
                                            (error)=>{
                                                console.log("connection query attempted", "error: ", error);
                                                if(!error){
                                                    console.log('connection query success!')
                                                    output.loggedIn = true;
                                                    response.send(output);
                                                }
                                            });
                        }
                        // connection.end(() => {
                        //     console.log('connection end'); //not sure where this goes.
                        // });                        
                        // response.send(output);
                    });
    }else{
        output.message = 'user name or password incorrect';
        response.send(output);
    }
});

server.post('/api/addTag', (request, response) => {
    const {userId, tagName} = request.body;
    console.log("request data: ", request.body);
    const output = {
        success: false
    };

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
                }else{
                    output.error = "tagName exists already";
                    response.send(output);
                }
                
            }
        );
    }else{
        output.error = "userId or tagName invalid";
        response.send(output);
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
                    });
    }else{
        response.send(output);
    }
});

server.post('/api/getUserReceipts', (request, response) => {

    // SELECT receipts.ID, receipts.purchaseDate, receipts.storeName, receipts.total FROM receipts WHERE receipts.userId = ? AND receipts.status = 'active';

    const {userId} = request.body;
    console.log("request data: ", request.body);
    
    const output = {
        userReceipts: [],
        success: false
    };

    let userIdRegEx = /^[1-9][\d]*/;

    if (userIdRegEx.test(userId)){
        const connection = mysql.createConnection(sqrlDbCreds);
        connection.query("SELECT receipts.ID, receipts.purchaseDate, receipts.storeName, receipts.total FROM receipts WHERE receipts.userId = ? AND receipts.status = 'active';",
                    [userId],
                    (error, rows) => {
                        console.log('get receipts query made');
                        if (error){
                            console.log('get receipts query error', error);
                            response.send(output);
                        }
                        rows.forEach(element => {
                            output.userReceipts.push(element);
                        });
                        output.success = true;
                        connection.end(() => { console.log('connection end'); });                     
                        response.send(output);
                    });
    }
    else{
        response.send(output);
    }
});

server.post('/api/getTagsForReceipt', (request, response) => {
    const {receiptId} = request.body;
    console.log("request data: ", request.body);
    
    const output = {
        tags: [],
        success: false
    };

    let receiptIdRegEx = /^[1-9][\d]*/;

    if (receiptIdRegEx.test(receiptId)){
        const connection = mysql.createConnection(sqrlDbCreds);
        connection.query("SELECT receipts_tags.tagId,tags.tagName FROM receipts_tags JOIN tags ON receipts_tags.tagId=tags.ID WHERE receipts_tags.receiptId=?",
                    [receiptId],
                    (error, rows) => {
                        console.log('get tags for receipt query made');
                        if (error){
                            console.log('get tags for receipt query error', error);
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
                    });
    }else{
        response.send(output);
    }
});

server.post('/api/deleteReceipt', (request, response) => {

    // NOTE: This query is meant for doing a SOFT delete meaning the receipts status will be update to 'inactive' and will NOT be removed from the db

    const {receiptId} = request.body;
    console.log("request data: ", request.body);
    
    const output = {
        success: false
    };

    let receiptIdRegEx = /^[1-9][\d]*/;

    if (receiptIdRegEx.test(receiptId)){
        const connection = mysql.createConnection(sqrlDbCreds);
        connection.query("UPDATE receipts SET receipts.status = 'inactive' WHERE receipts.ID = ?;",
                    [receiptId],
                    (error, rows) => {
                        console.log('delete receipt query made');
                        if (error){
                            console.log('delete receipt query error', error);
                            response.send(output);
                        }
                        output.success = true;
                        connection.end(() => { console.log('connection end'); });                        
                        response.send(output);
                    });
    }
    else{
        response.send(output);
    }
});

server.post('/api/getReceipt', (request, response) => {
    const {receiptId} = request.body;
    console.log("request data: ", request.body);
    
    const output = {
        success: false
    };

    let receiptIdRegEx = /^[1-9][\d]*/;

    if (receiptIdRegEx.test(receiptId)){
        const connection = mysql.createConnection(sqrlDbCreds);
        connection.query("SELECT receipts.ID, receipts.storeName, receipts.total, receipts.tax, receipts.creditCardName, receipts.creditCardDigits, receipts.purchaseDate, receipts.category, receipts.comment, receipts.reimbursable FROM receipts WHERE receipts.ID = ?;",
                    [receiptId],
                    (error, row) => {
                        console.log('get receipt query made');
                        if (error){
                            console.log('get receipt query error', error);
                            response.send(output);
                        }
                        output.receipt = row[0];
                        output.success = true;
                        connection.end(() => { console.log('connection end'); });                        
                        response.send(output);
                    });
    }
    else{
        response.send(output);
    }
});

server.post('/api/addReceipt', (request, response) => {
    
    // Destructuring request object (w/ default values)
    const {userId} = request.body;
    const purchaseDate = getCurrentDate();
    console.log("request data: ", request.body);
    
    // Output message for front-end
    const output = {
        success: false
    };

    // Regex for all input data validation
    let userIdRegex = /^[1-9][\d]*$/;

    if(userIdRegex.test(userId)){
        const connection = mysql.createConnection(sqrlDbCreds);

        connection.query("INSERT INTO receipts (userId, purchaseDate) VALUES (?, ?);",
            [userId, purchaseDate],
            (error, result) => {
                console.log('add receipt query made');
                if(error){
                    console.log('add receipt query error', error);
                    response.send(output);
                }
            });
        
        connection.query("SELECT LAST_INSERT_ID();",
        (error, result) => {
            console.log('last_insert_id query made');
            if(error){
                console.log('last_insert_id query error', error);
                response.send(output);
            }
            output.receiptId = result[0][Object.keys(result[0])[0]];
            output.success = true;
            connection.end(() => { console.log('connection end'); });
            response.send(output);
        });
    }
    else{
        output.error = 'userId invalid for add receipt';
        response.send(output);
    }
});

server.post('/api/updateReceipt', (request, response) => {

    // Destructuring request object (w/ default values)
    const {receiptId, storeName, total, tax=0, creditCardName=null, creditCardDigits=null, purchaseDate=getCurrentDate(), category=null, comment=null, reimbursable=0} = request.body;
    console.log("request data: ", request.body);
    
    // Output message for front-end
    const output = {
        success: false
    };

    // Regex for all input data validation
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

            // Create connection to db
            const connection = mysql.createConnection(sqrlDbCreds);

            // Attempt SQL query
            connection.query("UPDATE receipts SET receipts.storeName = ?, receipts.total = ?, receipts.tax = ?, receipts.creditCardName = ?, receipts.creditCardDigits = ?, receipts.purchaseDate = ?, receipts.category = ?, receipts.comment = ?, receipts.reimbursable = ?  WHERE receipts.ID = ?;",
                [storeName, total, tax, creditCardName, creditCardDigits, purchaseDate, category, comment, reimbursable, receiptId],
                (error, result) => {
                    console.log('update receipt query sent');

                    if(error){
                        console.log('update receipt query error', error);
                        response.send(output);
                    }
                    output.success = true;

                    // Close connection to db
                    connection.end(() => { console.log('connection end'); });
                    
                    // Send status of query to front-end
                    response.send(output);
                });
        }
        else{
            // Send status of query to front-end
            output.error = 'optional input data --invalid';
            response.send(output);
        }
    }
    else{
        // Send status of query to front-end
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

function getCurrentDate(){
    let today = new Date();
    let current_date = today.toISOString().slice(0,10);
    return current_date;
}