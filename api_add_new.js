const mysql = require('mysql');
const sqrlDbCreds = require('./sqrlDbCreds');

server.get('/api/getTags', (request, response) => {
    response.send({
        success: true,
        message: 'test is working',
        date: new Date().toDateString()
    });
});

server.post('/api/addTag', (request, response) => {
    const {userId, tagName} = request.body;
    const connection = mysql.createConnection(sqrlDbCreds);
    const output = {
        success: false,
        userId: userId,
        tagName: tagName
    };

    connection.query("INSERT INTO tags (userId, tagName) VALUES (?, ?);",
                     [`${userId}`, `${tagName}`],
                     (error, result) => {
                        if (error){
                            console.log('query ', error);
                            response.send(output);
                        }
                        console.log('result: ', result.insertID);
                        output.success = true;
                        output.tagId = result.insertID;
                     });
    connection.end(() => {
        console.log('connection ended');
    });
    
    response.send(output);
});

server.post('/api/login', (request, response) => {
    console.log('POST DATA: ', request.body);
    response.send({
        success: true,
        message: 'you are now logged in',
        receivedData: request.body
    });
});