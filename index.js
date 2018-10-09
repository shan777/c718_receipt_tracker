const express = require('express');
const PORT = process.env.PORT || 9000;
const server = express();
const { resolve } = require('path'); // path is a module included with node
const cors = require('cors');
const mysql = require('mysql');
const sqrlDbCreds = require('./sqrlDbCreds');

server.use(express.static(resolve(__dirname, 'client', 'dist')));
server.use(cors()); // allows cross origin
server.use(express.json()); // replaces body parser

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
                        console.log('tags for receipt query made');
                        if (error){
                            console.log('tags for receipt query error', error);
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
                        console.log('tags for receipt query made');
                        if (error){
                            console.log('tags for receipt query error', error);
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

server.post('/api/addReceipt', (request, response) => {
    
    // Destructuring request object (w/ default values)
    const {userId, storeName, total, tax=0, creditCardName=null, creditCardDigits=null, purchaseDate=getCurrentDate(), category=null, comment=null, reimbursable=0} = request.body;
    console.log("request data: ", request.body);
    
    // Output message for front-end
    const output = {
        success: false
    };

    // Regex for all input data validation
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
        console.log('required input data --valid');

        // Validating optional input data
        if((taxRegex.test(tax) || tax===0) && (creditCardNameRegex.test(creditCardName) || creditCardName===null) && (creditCardDigitsRegex.test(creditCardDigits) || creditCardDigits===null) 
            && (categoryRegex.test(category) || category===null) && (commentRegex.test(comment) || comment===null) && (reimbursableRegex.test(reimbursable) || reimbursable===0)){
            console.log('optional input data --valid');

            // Create connection to db
            const connection = mysql.createConnection(sqrlDbCreds);

            // Attempt SQL query
            connection.query("INSERT INTO receipts (userId, storeName, total, tax, creditCardName, creditCardDigits, purchaseDate, category, comment, reimbursable) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
                [userId, storeName, total, tax, creditCardName, creditCardDigits, purchaseDate, category, comment, reimbursable],
                (error, result) => {
                    console.log('query sent');

                    if(error){
                        console.log('query error', error);
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