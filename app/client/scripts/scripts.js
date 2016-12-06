var hostname = window.location.hostname;
var protocol = window.location.protocol;
var port = window.location.port;
var channelname = window.location.pathname.replace('/','').replace('?','');

$('#nameChannel').html(channelname);

var socket = io();
socket.connect(protocol + '//' + hostname + ':' + port);
$('form').submit(function(){
  socket.emit(channelname, {message: $('#message').val(), user: getUser()});
  $('#message').val('');
  return false;
});
socket.on(channelname, function(msg){
  $('#messages').append(createDiv(msg.user, msg.message, formatDate(new Date())));
});

$.ajax({
   url: protocol + '//' + hostname + ':3001/api/' + channelname,
   type:'GET',
   success: function(data){
      var msgs = data[0].messages;
      for (var i = 0; i < msgs.length; i++) {
        $('#messages').append(
          createDiv(msgs[i].user, msgs[i].message, formatDate(msgs[i].datetime))
        );
      }
   }
});

function formatDate(date){
  Number.prototype.padLeft = function(base,chr){
     var  len = (String(base || 10).length - String(this).length)+1;
     return len > 0? new Array(len).join(chr || '0')+this : this;
  };
  var d = new Date(date),
        dformat = [ (d.getMonth()+1).padLeft(),
                    d.getDate().padLeft(),
                    d.getFullYear()].join('/')+
                    ' ' +
                  [ d.getHours().padLeft(),
                    d.getMinutes().padLeft(),
                    d.getSeconds().padLeft()].join(':');
  return dformat;
}


function createDiv(user, msg, date){
  return (
    '<div class="alert alert-' + colors(user) + '" role="alert">' +
      '<strong>' + user + '</strong> ' + '(' + date + ') <br/><span>' + msg + '</span>' +
    '</div>'
  );
}

var userColors = [];
var allColors = ['success', 'warning', 'info', 'danger', 'color1', 'color2', 'color3', 'color4', 'color5', 'color6'];

function colors(user){
  for (var i = 0; i < userColors.length; i++) {
    if(userColors[i].user == user){
      return userColors[i].color;
    }
  }
  var color = getNextColor();
  userColors.push({user: user, color: color});
  return color;
}

function getNextColor(){
    var color = allColors[0];
    var i = allColors.indexOf(color);
    if(i != -1) {
    	allColors.splice(i, 1);
    }
    return color;
}

function sigin(){
  $('.error').hide();
  var email = $('#email').val();
  if(validateEmail(email)){
    $.cookie('user-chat', email);
    $('#name-user').html($.cookie('user-chat'));
    $('.login').hide(function(){
      $('.chat').show();
    });
  } else {
    $('.error').show();
  }
}

$('#btnEmail').click(function(){
  sigin();
});

$('.exit').click(function(){
  $.removeCookie('user-chat');
  $('.chat').hide(function(){
    $('.login').show();
  });
});

$(document).ready(function() {

  $('#messages').bind('DOMNodeInserted DOMNodeRemoved', function() {
    var objDiv = document.getElementById('messages');
    objDiv.scrollTop = objDiv.scrollHeight;
  });

  if($.cookie('user-chat')){
    $('#name-user').html($.cookie('user-chat'));
    $('.chat').show();
  } else {
    $('.login').show();
  }

  $('#email').keyup(function(event){
      if(event.keyCode == 13){
          sigin();
      }
  });

});

function getUser(){
  return $.cookie('user-chat');
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
