var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({ extended: false });

// Load database
var db = require('../../database');
var Oneline = db.onelines;

router.param('oneline', function(req, res, next, id) {
  var query = Oneline.findById(id);

  query.exec(function(err, oneline) { 
    if (err) { return next(err); }
    //if (!oneline) { return next(new Error("Can't find oneline with id " + id)); }

    req.oneline = oneline;
    return next();
  });
});

router.route('/')
  .get(function(req, res) {
    // Find all and return json
    Oneline.find({}, function(err, data) {
      if (!data) {
        res.status(204).json("Not found");
        return;
      }
      res.json(data);                  
    });
  })
  .post(urlencode, function(req, res) {
    var newOneline = new Oneline(req.body);
    newOneline.save(function(err, saved, numberAffected) {
      if (err) {
        console.log('problem saving the onelineable');
        res.status(500).json({'message': 'db error'});
        return;
      }
  
      // Return the subject of new onelineable
      res.status(201).json(newOneline);
    });
  });

router.route('/:oneline')
  .delete(function(req, res) {
    Oneline.find(req.oneline).remove().exec();
    res.sendStatus(204);
  })
  .get(function(req, res) {
    if (!req.oneline) {
      res.sendStatus(204);
      return;
    }
    res.status(200).json(req.oneline);
  });

module.exports = router;
