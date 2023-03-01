const express = require('express');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('Assets'));
var connectionCount = 0;
var sessionID = 0;

app.get('/', function(req, res) {
	res.sendFile('index2.html', { root: __dirname });
});

io.on('connection', function(socket) {
	connectionCount ++;
	io.emit('connectionCount', connectionCount);

	socket.on('disconnect', function() {
		connectionCount --;
		io.emit('connectionCount', connectionCount);

	});

	socket.on('chat_message', function(msg) {
		if(msg.length > 0) {
			io.emit('chat_message', msg + "~" + connectionCount);
		}
	});

	io.sockets.on('session', function(socket) {
		sessionID = socket.id;
	  });
});



http.listen(3000, function() {
	console.log('listening on *:3000');
});


