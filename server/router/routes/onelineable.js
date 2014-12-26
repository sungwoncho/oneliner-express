var express = require('express');
var router = express.Router();
var db = require('../../database');
var Onelineable = db.onelineable;

router.route('/')
  .get(function(req, res) {
    // Find all and return json
    Onelineable.find({}, function(err, data) {
      res.json(data);                  
    });
  });

module.exports = router;
