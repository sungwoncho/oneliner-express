var mongoose = require('mongoose');
var OnelinesModel = require('./schemas/oneline');

// Connections
var testDb = 'mongodb://localhost/test';
var developmentDb = 'mongodb://localhost/development';
var productionDb = '';
var usedDb;

// When in development
if (process.env.NODE_ENV === 'development') {
  usedDb = developmentDb;
  mongoose.connect(usedDb);
}

// When in test
if (process.env.NODE_ENV === 'test') {
  usedDb = testDb;
  mongoose.connect(testDb);
}

if (process.env.NODE_ENV === 'production') {
  usedDb = productionDb;
  mongoose.connect(usedDb);
}

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback() {
  console.log('Database connection succesfully opened at ' + usedDb);
});

exports.onelines = OnelinesModel;
