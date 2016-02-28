var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

app.use('/static', express.static('public'));

io.on('connection', function(socket){
  console.log('a user connected');
});

io.on('connection', function(socket){
  socket.on('chat', function(msg){
    console.log('message: ' + msg);

    socket.broadcast.emit('chat', {
      message: msg.message,
      messageId: msg.messageId,
      author: msg.author
    });
  });
});

http.listen(4567, function(){
  console.log('listening on *:4567');
});