var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({ extended: false });

// Load database
var db = require('../../database');
var Onelineable = db.onelineable;

router.route('/')
  .get(function(req, res) {
    // Find all and return json
    Onelineable.find({}, function(err, data) {
      res.json(data);                  
    });
  })
  .post(urlencode, function(req, res) {
    var newOnelineable = new Onelineable(req.body);
    newOnelineable.save(function(err, saved, numberAffected) {
      if (err) {
        console.log('problem saving the onelineable');
        res.status(500).json({'message': 'db error'});
        return;
      }
  
      // Return the subject of new onelineable
      res.status(201).json(newOnelineable.subject);
    });
  });

router.route('/:_id')
  .delete(function(req, res) {
    Onelineable.findById(req.params._id, function(err, found) {
      if (typeof(found) === 'undefined') {
        return;
      }
      found.remove();
      res.sendStatus(204);
    });
  })
  .get(function(req, res) {
    Onelineable.findById(req.params._id, function(err, found) {
      if (typeof(found) === 'undefined') {
        return;
      }
      res.status(200).json(found);
    });
  });

module.exports = router;
