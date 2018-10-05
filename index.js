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
    console.log(request.body);
    console.log('addtag called', userId, tagName);
    const connection = mysql.createConnection(sqrlDbCreds);
    const output = {
        success: false,
        userId: userId,
        tagName: tagName
    };
    console.log(output);
    connection.query("INSERT INTO tags (userId, tagName) VALUES (?, ?);",
                    [userId, tagName],
                    (error, result) => {
                        console.log('query ran');
                        if (error){
                            console.log('query ', error);
                            response.send(output);
                        }
                        console.log('result: ', result.insertId);
                        output.success = true;
                        output.tagId = result.insertId;
                        connection.end(() => {
                            console.log('connection ended');
                        });                        
                        response.send(output);
                    });
    
    });

server.get('*', (request, response) => {
    response.sendFile(resolve(__dirname, 'client', 'dist', 'index.html')); // resolve ensures a correct path
});

server.listen(PORT, () => {
    console.log('server listening on port ' + PORT);
});