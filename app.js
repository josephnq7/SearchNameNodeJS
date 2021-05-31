//1. create a web server
var http = require('http');
http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Hello World\n Joseph \n');
}).listen(3450, '127.0.0.1');

console.log('Server running at http://127.0.0.1:3450');