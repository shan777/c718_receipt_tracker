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

    let userIdRedEx = /^[1-9][\d]*/;
    let tagNameRegEx = /^[a-zA-Z \d-_]{2,}$/;

    if (userIdRedEx.exec(userId) && tagNameRegEx.exec(tagName)){
        const connection = mysql.createConnection(sqrlDbCreds);
        connection.query("INSERT INTO tags (userId, tagName) VALUES (?, ?);",
                    [userId, tagName],
                    (error, result) => {
                        console.log('query made');
                        if (error){
                            console.log('query error', error);
                            response.send(output);
                        }
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
    /*
        INSERT INTO receipts (userId, storeName, total, tax, creditCardName, creditCardDigits, purchaseDate, category, comment, reimbursable) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    */

    const {userId, storeName, total, tax, creditCardName, creditCardDigits, purchaseDate, category, comment, reimbursable} = request.body;
    console.log("request data: ", request.body);
    
    const output = {
        success: false
    };

    let userIdRegEx = /^[1-9][\d]*$/; // will also use for: total, tax
    let storeNameRegEx = /^[a-zA-Z \d-_]{2,}$/;
    let creditCardNameRegex = /^[a-zA-Z ]{2,}$/;
    let creditCardDigitsRegex = /^[\d]{4}$/;
    let purchaseDateRegex = /^\d{4}-{1}\d{2}-{1}\d{2}$/;
    let categoryRegex = /^[a-zA-Z]$/;
    let commentRegex = /^[a-zA-Z\d .-*/$%!?()+=]$/;
    let reimbursableRegex = /^[01]{1}$/;

    /*
    if (userIdRedEx.test(userId) && tagNameRegEx.test(storeName)){
        const connection = mysql.createConnection(sqrlDbCreds);
        connection.query("INSERT INTO tags (userId, tagName) VALUES (?, ?);",
                    [userId, tagName],
                    (error, result) => {
                        console.log('query made');
                        if (error){
                            console.log('query error', error);
                            response.send(output);
                        }
                        output.success = true;
                        connection.end(() => {
                            console.log('connection end');
                        });                        
                        response.send(output);
                    });
    }
    else{
        response.send(output);
    }
    */
});

server.get('*', (request, response) => {
    response.sendFile(resolve(__dirname, 'client', 'dist', 'index.html')); // resolve ensures a correct path
});

server.listen(PORT, () => {
    console.log('server listening on port ' + PORT);
});