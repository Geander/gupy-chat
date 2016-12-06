var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var request = require('request');
var path = require('path');

var channelname = '';

app.use(express.static(path.resolve(__dirname + '/../client/')));

app.get('/:channelname', function(req, res){
  channelname = req.params.channelname;
  res.sendFile(path.resolve(__dirname + '/../client/index.html'));
});

io.on('connection', function(socket){
  socket.on(channelname, function(msg){
    saveMsg(msg);
    io.emit(channelname, msg);
  });
});

function saveMsg(msg){
  request.post(
      'http://localhost:3001/api/' + channelname,
      { json: { user: msg.user, message: msg.message } }
  );
};

http.listen(3000, function(){
  console.log('listening on *:3000');
});
