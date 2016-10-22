const express = require('express');
const path = require('path');
var config = require('./webpack_dev.config');

const port = 8081;
const app = express();

app.use(express.static(__dirname + '/dist'));

app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.listen(port);
console.info('Server started on port ' + port);
