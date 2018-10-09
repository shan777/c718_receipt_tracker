const express = require('express');
const PORT = process.env.PORT || 9000;
const server = express();
const { resolve } = require('path'); // path is a module included with node
const cors = require('cors');
const mysql = require('mysql');
const sqrlDbCreds = require('./sqrlDbCreds');
const session = require('express-session');

// i feel like this should not be on github.
const sessionParams = {
    secret: 'sqrlDb',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
};

const sessionExec = session(sessionParams);

server.use(express.static(resolve(__dirname, 'client', 'dist')));
server.use(cors()); // allows cross origin
server.use(express.json()); // replaces body parser

server.post('/api/login', (request, response) => {
    const {userName, password} = request.body;
    console.log("login request data: ", request.body);
    
    const output = {
        success: false,
        loggedIn: false
    };

    let userNameRegEx = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
    let password = /^(?=[a-zA-Z])(?=.{8,32}$)(?=.*[A-Z])(?=.*[a-z]).*$/;

    if (userNameRegEx.exec(userId) && password.exec(tagName)){
        console.log('regEx matched');
        const connection = mysql.createConnection(sqrlDbCreds);
        connection.query("SELECT ID FROM students WHERE username = ? AND password = SHA1(?) AND status = ?",
                    [userName, password],
                    (error, rows) => {
                        console.log('login query made');
                        if (error){
                            console.log('login query error', error);
                            response.send(output);
                        }
                        output.userId = 
                        output.success = true;
                        connection.end(() => {
                            console.log('connection end');
                        });                        
                        response.send(output);
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

server.get('*', (request, response) => {
    response.sendFile(resolve(__dirname, 'client', 'dist', 'index.html')); // resolve ensures a correct path
});

server.listen(PORT, () => {
    console.log('server listening on port ' + PORT);
});