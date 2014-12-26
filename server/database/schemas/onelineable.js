var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var onelinerableSchema = new Schema({
  subject: String,
  author: String,
  upvotes: { type: Number, default: 0 }
});

var Onelineable = mongoose.model('Onelineable', onelinerableSchema);

module.exports = Onelineable;
