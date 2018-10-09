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

    if (userIdRegEx.exec(userId)){
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

server.get('*', (request, response) => {
    response.sendFile(resolve(__dirname, 'client', 'dist', 'index.html')); // resolve ensures a correct path
});

server.listen(PORT, () => {
    console.log('server listening on port ' + PORT);
});