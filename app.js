//1. create a web server
var http = require('http');
var router = require('./router.js')
http.createServer(function (request, response) {
    router.home(request, response);
    router.user(request, response);
}).listen(3450, '127.0.0.1');



console.log('Server running at http://127.0.0.1:3450');