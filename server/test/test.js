var request = require('supertest');
var app = require('../app');
var db = require('../database');
var onelines = db.onelines;
var expect = require('chai').expect;

var mongoose = require('mongoose');
// Empty the models and model schemas for mocha --watch
mongoose.models = {};
mongoose.modelSchemas = {};

before(function() {
  // Flush the test database
  onelines.remove({}, function(err) {
    console.log('collection removed');               
  });
});

// Close the connection for mocha --watch
after(function() {
  mongoose.connection.close();
})

describe('listing oneliness on /onelines', function() {
  it('Returns a 200 status code', function(done) {
    request(app)
      .get('/onelines')
      .expect(200, done)
  });

  it('Returns JSON format', function(done) {
    request(app)
      .get('/onelines')
      .expect('Content-Type', /json/, done);
  });

  it('Returns all onelines objects', function(done) {
    var onelines1 = new onelines({
      subject: 'Sydney',
      author: 'user1'
    });
    var onelines2 = new onelines({
      subject: 'Airport',
      author: 'user2'
    });

    onelines1.save();
    onelines2.save();

    request(app)
      .get('/onelines')
      .end(function(err, res) {
        expect(res.body.length).to.eq(2);
        done();
      });
  });
});

describe('Creating onelines', function() {
  it('Returns a 201 status code', function(done) {
    request(app)
      .post('/onelines')
      .send('subject=Banana&oneline=a+delicious+food')
      .expect(201, done);
  });

  it('Returns the new onelines subject', function(done) {
    request(app)
      .post('/onelines')
      .send('subject=Banana&oneline=a+delicious+food')
      .expect(/banana/i, done);
  });
});

describe('Deleting onelines', function() {
  
  before(function() {
    var banana = new onelines({
      subject: 'Banana',
      author: 'user2'
    });
    banana.save();
  });
  
  it('Returns 204 status code', function(done) {
    var bananaId;

    onelines.findOne({subject: 'Banana'}, function(err, data) {
      bananaId = data._id;                                  

      request(app)
        .delete('/onelines/' + bananaId)
        .expect(204, done);
    });    
  });
});

describe('Showing onelines', function() {
  before(function() {
    var banana = new onelines({
      subject: 'Banana',
      author: 'user2'
    });
    banana.save();
  });

  it('Returns 200 status code', function(done) {
 
    onelines.findOne({subject: 'Banana'}, function(err, data) {
      bananaId = data._id;                                  

      request(app)
        .get('/onelines/' + bananaId)
        .expect(200, done);
    });    
    
  });

  it('Returns information for the requested oneline', function(done) {
    
    onelines.findOne({subject: 'Banana'}, function(err, data) {
      bananaId = data._id;                                  

      request(app)
        .get('/onelines/' + bananaId)
        .expect(/Banana/, done);
    });    
  });
});
