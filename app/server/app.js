var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var request = require('request');
var path = require('path');

var hostname = '';
var channelname = '';
var protocol = '';

app.use(express.static(path.resolve(__dirname + '/../client/')));

app.get('/:channelname', function(req, res){
  channelname = req.params.channelname;
  hostname = req.hostname;
  protocol = req.protocol;
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
      protocol + '://' + hostname + ':3001/api/' + channelname,
      { json: { user: msg.user, message: msg.message } }
  );
};

http.listen(3000, function(){
  console.log('listening on *:3000');
});
