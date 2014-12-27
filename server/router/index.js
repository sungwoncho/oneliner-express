module.exports = function(app) {
  app.use('/onelines', require('./routes/oneline'));
}
