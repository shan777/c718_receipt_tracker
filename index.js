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
const connection = mysql.createConnection(sqrlDbCreds);

server.use(express.static(resolve(__dirname, 'client', 'dist')));
server.use(cors());
server.use(express.json());
server.use(sessionExec);

require('./manageTags')(server, connection);
require('./manageReceipts')(server, connection);
require('./manageUsers')(server, connection);

server.get('*', (request, response) => {
    response.sendFile(resolve(__dirname, 'client', 'dist', 'index.html')); // resolve ensures a correct path
});

server.listen(PORT, () => {
    console.log('server listening on port ' + PORT);
});
