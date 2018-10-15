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
const functions = require("./helpers.js");

server.use(express.static(resolve(__dirname, 'client', 'dist')));
server.use(cors());
server.use(express.json());
server.use(sessionExec);

require('./manageTags')(server);

server.post('/api/checkLoginStatus', (request, response) => {
    const userId = request.session.userId;
    const output = {
        success: true,
    }

    if (userId){
        output.loggedIn = true;
    }
    else{
        output.loggedIn = false;
    };
    return response.status(200).send(output);
});

server.post('/api/login', (request, response) => {
    const {userName, password} = request.body;
    const output = {
        success: false,
        loggedIn: false
    };

    const status = 'active';
    const connection = mysql.createConnection(sqrlDbCreds);
    connection.query("SELECT users.ID FROM users WHERE users.username=? AND users.password=SHA1(?) AND users.status=?",
                    [userName, password, status],
                    (error, rows) => {
                        output.success = true;
                        if (error){
                            output.error = error;
                            return response.status(400).send(output);
                        }else if (rows){
                            output.userId = rows[0].ID;
                            output.loggedIn = true;
                            request.session.userId = output.userId;
                            return response.status(200).send(output);
                        }   
    });
});

server.post('/api/logout', (request, response) => {
    const userId = request.session.userId;
    const output = {
        success: true,
        loggedIn: null
    };
    if (userId){
        request.session.destroy();
        output.loggedIn = false;
        return response.status(200).send(output);
    }else{
        return response.status(400).send(output);
    }
});

server.post('/api/getUserReceipts', (request, response) => {
    const userId = request.session.userId;
    const output = {
        receipts: [],
        success: false
    };
    if (userId){
        const connection = mysql.createConnection(sqrlDbCreds);
        connection.query(`SELECT r.storeName, r.total, r.purchaseDate, r.category, r.comment FROM receipts WHERE receipts.userId = ? AND receipts.status = 'active';`,
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

server.post('/api/filterReceipts', (request, response) => {
    const userId = request.session.userId;
    const output = {
        receipts: [],
        success: false
    };
    let dynamicQuery = functions.getQueryForFilters(request.body);
    console.log(dynamicQuery);
    if (userId){
        const connection = mysql.createConnection(sqrlDbCreds);
        connection.query(dynamicQuery,
                        [userId],
                        (error, rows) => {
                            if (error){
                                output.error = error;
                                return response.status(400).send(output);
                            }else if(rows){
                                rows.forEach(element => {
                                    output.receipts.push(element);
                                });
                                output.success = true;
                                return response.status(200).send(output);
                            }
        });
    }else{
        output.error = "User not logged in.";
        return response.status(401).send(output);
    }
});

server.post('/api/deleteReceipt', (request, response) => {
    // NOTE: This query is meant for doing a SOFT delete meaning the receipts status will be update to 'inactive' and will NOT be removed from the db
    const {receiptId} = request.body;
    const userId = request.session.userId;
    const output = {
        success: false
    };
    if(userId){
        const connection = mysql.createConnection(sqrlDbCreds);
        connection.query("UPDATE receipts SET receipts.status = 'inactive' WHERE receipts.ID = ?;",
                        [receiptId],
                        (error) => {
                            if (error){
                                output.error = error;
                                return response.status(400).send(output);
                            }else{
                                output.success = true;
                                return response.status(200).send(output);
                            }
                            
        });
    }else{
        output.error = "User not logged in.";
        return response.status(401).send(output);
    }
});

server.post('/api/addReceipt', (request, response) => {
    const userId = request.session.userId;
    const output = {
        success: false
    };

    if (userId){
        request.body.userId = userId;
        let data_validation = functions.validator(request.body);

        if(data_validation.pass){
            const connection = mysql.createConnection(sqrlDbCreds);
            const query = connection.query("INSERT INTO receipts SET ?;",
                            [request.body],
                            (error) => {
                                if(error){
                                    output.error = error;
                                    output.success = false;
                                    return response.status(400).send(output);
                                }
                                output.success = true;
                                return response.status(200).send(output);
                            }
            );
        }
        else{
            output.validation = data_validation;
            return response.status(400).send(output);
        }
    }else{
        output.error = "User not logged in.";
        return response.status(401).send(output);
    }
});

server.post('/api/updateReceipt', (request, response) => {
    const output = {
        success: false
    };
    let data_validation = functions.validator(request.body);

    if(data_validation.pass){
        const {receiptId} = request.body;
        delete request.body.receiptId;
        const connection = mysql.createConnection(sqrlDbCreds);
        const query = connection.query("UPDATE receipts SET ? WHERE receipts.ID = ?;",
                        [request.body, receiptId],
                        (error) => {
                            if(error) throw error;
                            output.success = true;
                            return response.status(200).send(output);
                        }
        );
    }
    else{
        output.validation = data_validation;
        return response.status(400).send(output);
    }
});

server.post('/api/signUp', (request, response) => {
    const data = request.body;

    const output = {
        success: false
    };

    let data_validation = functions.validator(data);

    if(data_validation.pass){
        const encryptedPassword = mysql.raw(`SHA1('${request.body.password}')`);
        data.password = encryptedPassword;
        data.status = "active";
        
        const connection = mysql.createConnection(sqrlDbCreds);
        connection.query("INSERT INTO users SET ?;",
                        [data],
                        (error, result) => {
                            if(error){
                                output.error = error;
                                return response.status(400).send(output);
                            }
                            connection.query("SELECT users.ID FROM users WHERE users.username=? AND users.password=? AND users.status=?",
                                            [data.userName, data.password, data.status],
                                            (error, rows) => {
                                                output.success = true;
                                                if (error){
                                                    output.error = error;
                                                    return response.status(400).send(output);
                                                }else if (rows){
                                                    output.userId = rows[0].ID;
                                                    output.loggedIn = true;
                                                    request.session.userId = output.userId;
                                                    return response.status(200).send(output);
                                                } 
                                            }
                            );
                        }
        );
    }
    else{
        output.validation = data_validation;
        return response.send(output);
    }
});

server.get('*', (request, response) => {
    response.sendFile(resolve(__dirname, 'client', 'dist', 'index.html')); // resolve ensures a correct path
});

server.listen(PORT, () => {
    console.log('server listening on port ' + PORT);
});
