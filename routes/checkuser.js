var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoClient = require('mongodb').MongoClient;

var jsonParser = bodyParser.json();
var url = 'mongodb://plan:eat@ds021711.mlab.com:21711/planeat';

router.post('/', jsonParser, function(req, res) {
  var checkUser = {
    username: req.body.user
  }
  mongoClient.connect(url, function(err, db) {
    var users = db.collection('users');
    if (!err) {
      users.find(checkUser).toArray(function(err, results) {
        if (!err) {
          if (results.length != 0) {
            res.sendStatus(204);
          }
          else {
            res.sendStatus(200);
          }
        }
        else {
          res.sendStatus(500);
        }
        db.close();
      })
    }
    else {
      res.sendStatus(500);
    }
  })
})

module.exports = router;
