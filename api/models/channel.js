var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ChannelSchema   = new Schema({
    name: { type : String , unique : true, required : true, dropDups: true },
    messages: [
      {user: String,
      message: String,
      datetime : { type : Date }}
    ]
});

module.exports = mongoose.model('channel', ChannelSchema);
