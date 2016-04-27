var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoClient = require('mongodb').MongoClient;
var crypto = require('crypto');

var jsonParser = bodyParser.json();
var url = 'mongodb://plan:eat@ds021711.mlab.com:21711/planeat';

function hash(pwd) {
  var hash = crypto.createHash('sha256');
  hash.update(pwd);
  return hash.digest('base64');
}

function sessionId() {
  return Math.floor(Math.random() * 10000000000000);
}

router.post('/', jsonParser, function(req, res) {
  mongoClient.connect(url, function(err, db) {
    if (!err) {
      var users = db.collection('users');
      users.find({username: req.body.user}).toArray(function(err, results) {
        if (!err) {
          if (results.length != 0 && results[0].pwd === hash(req.body.pwd)) {
            results[0].session = sessionId();
            users.update({username: req.body.user}, {$set: {session: results[0].session}})
            res.cookie("session", results[0].session);
            res.sendStatus(200);
          }
          else {
            res.sendStatus(204);
          }
        }
        else {
          res.sendStatus(500);
        }
      })
    }
    else {
      res.sendStatus(500);
    }
  })
});

module.exports = router;
