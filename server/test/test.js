var request = require('supertest');
var app = require('../app');
var db = require('../database');
var Onelineable = db.onelineable;
var expect = require('chai').expect;

var mongoose = require('mongoose');
// Empty the models and model schemas for mocha --watch
mongoose.models = {};
mongoose.modelSchemas = {};

before(function() {
  // Flush the test database
  Onelineable.remove({}, function(err) {
    console.log('collection removed');               
  });
});

// Close the connection for mocha --watch
after(function() {
  mongoose.connection.close();
})

describe('listing onelineables on /onelineable', function() {
  it('Returns a 200 status code', function(done) {
    request(app)
      .get('/onelineable')
      .expect(200, done)
  });

  it('Returns JSON format', function(done) {
    request(app)
      .get('/onelineable')
      .expect('Content-Type', /json/, done);
  });

  it('Returns all onelineable objects', function(done) {
    var onelineable1 = new Onelineable({
      subject: 'Sydney',
      author: 'user1'
    });
    var onelineable2 = new Onelineable({
      subject: 'Airport',
      author: 'user2'
    });

    onelineable1.save();
    onelineable2.save();

    request(app)
      .get('/onelineable')
      .end(function(err, res) {
        expect(res.body.length).to.eq(2);
        done();
      });
  });
});

describe('Creating onelineable', function() {
  it('Returns a 201 status code', function(done) {
    request(app)
      .post('/onelineable')
      .send('subject=Banana&oneline=a+delicious+food')
      .expect(201, done);
  });

  it('Returns the new onelineable subject', function(done) {
    request(app)
      .post('/onelineable')
      .send('subject=Banana&oneline=a+delicious+food')
      .expect(/banana/i, done);
  });
});

describe('Deleting onelineable', function() {
  
  before(function() {
    var banana = new Onelineable({
      subject: 'Banana',
      author: 'user2'
    });
    banana.save();
  });
  
  it('Returns 204 status code', function(done) {
    var bananaId;

    Onelineable.findOne({subject: 'Banana'}, function(err, data) {
      bananaId = data._id;                                  

      request(app)
        .delete('/onelineable/' + bananaId)
        .expect(204, done);
    });    
  });
});

describe('Showing onelineable', function() {
  before(function() {
    var banana = new Onelineable({
      subject: 'Banana',
      author: 'user2'
    });
    banana.save();
  });

  it('Returns 200 status code', function(done) {
 
    Onelineable.findOne({subject: 'Banana'}, function(err, data) {
      bananaId = data._id;                                  

      request(app)
        .get('/onelineable/' + bananaId)
        .expect(200, done);
    });    
    
  });

  it('Returns information for the requested oneline', function(done) {
    
    Onelineable.findOne({subject: 'Banana'}, function(err, data) {
      bananaId = data._id;                                  

      request(app)
        .get('/onelineable/' + bananaId)
        .expect(/Banana/, done);
    });    
  });
});
