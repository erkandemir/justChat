var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var connectionCount = 0;

app.get('/', function(req, res) {
	res.sendfile('index.html');
});

io.on('connection', function(socket) {
	connectionCount ++;
	io.emit('connectionCount', connectionCount);

	socket.on('disconnect', function() {
		connectionCount --;
		io.emit('connectionCount', connectionCount);

	});

	socket.on('chat message', function(msg) {
		io.emit('chat message', msg);
	});
});



http.listen(3000, function() {
	console.log('listening on *:3000');
});