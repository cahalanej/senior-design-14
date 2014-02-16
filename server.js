var connect = require('connect');
var port = Number(process.env.PORT || 8080);
connect.createServer(
    connect.static(__dirname)
).listen(port);