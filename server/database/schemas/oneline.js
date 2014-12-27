var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var onelineSchema = new Schema({
  subject: String,
  oneline: String,
  author: String,
  upvotes: { type: Number, default: 0 }
});

var Onelines = mongoose.model('Onelines', onelineSchema);

module.exports = Onelines;
