var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({ extended: false });

// Load database
var db = require('../../database');
var Oneline = db.onelines;

router.route('/')
  .get(function(req, res) {
    // Find all and return json
    Oneline.find({}, function(err, data) {
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
      res.status(201).json(newOneline.subject);
    });
  });

router.route('/:_id')
  .delete(function(req, res) {
    Oneline.findById(req.params._id, function(err, found) {
      if (typeof(found) === 'undefined') {
        return;
      }
      found.remove();
      res.sendStatus(204);
    });
  })
  .get(function(req, res) {
    Oneline.findById(req.params._id, function(err, found) {
      if (typeof(found) === 'undefined') {
        return;
      }
      res.status(200).json(found);
    });
  });

module.exports = router;
