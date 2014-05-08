/*
Simple server to allow for file loading.
Running locally off port 8080 and in production on heroku 
*/

var connect = require('connect');
var port = Number(process.env.PORT || 8080);
connect.createServer(
    connect.static(__dirname)
).listen(port);