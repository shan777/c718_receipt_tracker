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
require('./manageReceipts')(server);

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
                        }else if (rows.length > 0){
                            output.userId = rows[0].ID;
                            output.loggedIn = true;
                            request.session.userId = output.userId;
                            return response.status(200).send(output);
                        }
                        output.error = 'User name or password invalid.';
                        return response.status(401).send(output);
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
        output.error = 'User not logged in.'
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
