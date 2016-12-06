var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var Channel    = require('./models/channel');
var mongoose   = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://gupychatuser:fFd15Sd032a@ds119598.mlab.com:19598/gupy-chat');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();

router.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'Api running!' });
});

router.get('/deleteAll', function(req, res) {
  Channel.remove({}, function(err) {
    res.json({ message: 'Deleted!' });
  });
});

router.route('/:channelname')
    .post(function(req, res) {
        var channelname = req.params.channelname;
        var user = req.body.user;
        var message = req.body.message;

        Channel.findOne({name : channelname}, function (err, docs) {

          if(docs && channelname && user && message){

            Channel.findByIdAndUpdate({_id: docs._id}, {$push: {'messages': {user: user, message: message, datetime: new Date() }}}, function(err, numAffected, rawResponse) {
              if (err) {
                return res.send(err);
              }
              res.json({ message: 'ok' });
            });

          } else {
              res.json({ message: 'bad request' });
          }

      });

    })
    .get(function(req, res) {
        var channelname = req.params.channelname;
        Channel.find({name: channelname}, function(err, docs) {
            if (err) {
              res.send(err);
            }

            if (!docs.length){
              var channel = new Channel();
              channel.name = channelname;
              channel.save(function(err) {
                  if (err)
                      res.send(err);
                      res.json([]);
              });
            } else {
              res.json(docs);
            }

        });
    });

app.use('/:channelname', router);
app.use('/api', router);
app.use('/deleteAll', router);

app.listen(3001);

module.exports = app;
