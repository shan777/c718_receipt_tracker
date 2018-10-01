const express = require('express');
const PORT = process.env.PORT || 9000;
const server = express();
const { resolve } = require('path'); // path is a module included with node
const cors = require('cors');

server.use(express.static(resolve(__dirname, 'client', 'dist')));
server.use(cors()); // allows cross origin
server.use(express.json()); // replaces body parser

server.get('/api/test', (request, response) => {
    response.send({
        success: true,
        message: 'test is working',
        date: new Date().toDateString()
    });
});

server.get('/api/user', (request, response) => {
    response.send({
        name: 'steve',
        age: 49,
        email: 'steveben',
        success: true,
        message: 'user is working',
        date: new Date().toDateString()
    });
});

server.post('/api/login', (request, response) => {
    console.log('POST DATA: ', request.body);
    response.send({
        success: true,
        message: 'you are now logged in',
        receivedData: request.body
    });
});


server.get('*', (request, response) => {
    response.sendFile(resolve(__dirname, 'client', 'dist', 'index.html')); // resolve ensures a correct path
});

server.listen(PORT, () => {
    console.log('server listening on port ' + PORT);
});