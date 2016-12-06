var mongoose = require('mongoose');
var Channel = require('../models/channel');

var chai = require('chai');
var chaiHttp = require('chai-http');
var api = require('../api');
var should = chai.should();

chai.use(chaiHttp);

describe('Channel', function() {

  it('Retrieves Channel', function(done){
    Channel.find({name: 'test@test.com'}, function(err, doc){
        doc.should.be.a('array');
        doc.length.should.be.eql(0);
      done();
    });
  });

});

describe('Api', function() {

  describe('/GET chat empty test', function() {

        it('it should GET all the messages', function(done) {
          chai.request(api)
              .get('/api/test')
              .end(function(err, res) {
                  res.should.have.status(200);
                  res.should.be.json;
                  res.body.should.be.a('array');
                done();
              });
        });
    });

    describe('/POST chat', function() {
      it('it should chat a message without erro field', function(done) {
        var msg = {
            message: 'Lorem ipsum dolor sit amet',
            user: 'user@gmail.com'
        };
        chai.request(api)
            .post('/api/test')
            .send(msg)
            .end(function(err, res) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message', 'ok');
              done();
            });
      });
      it('it should chat a message with erro field', function(done) {
        var msg = {
            message: 'Lorem ipsum dolor sit amet',
            user: ''
        };
        chai.request(api)
            .post('/api/test')
            .send(msg)
            .end(function(err, res) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message', 'bad request');
              done();
            });
      });
  });

});

describe('/GET chat test', function() {
  it('it should GET the message saved', function(done) {
    chai.request(api)
        .get('/api/test')
        .end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body.length.should.be.eql(1);
            res.body[0].should.have.property('_id');
            res.body[0].should.have.property('name');
            res.body[0].should.have.property('messages');
          done();
        });
    });
});
