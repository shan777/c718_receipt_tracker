const express = require('express');
const PORT = process.env.PORT || 8000;
const server = express();

server.get('/', (request, response) => {
    response.send('<h1>this is pretty cool</h1>');
});

server.listen(8000, () => {
    console.log('server listening on port ' + PORT);
});