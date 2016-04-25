var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoClient = require('mongodb').MongoClient;
var crypto = require('crypto');

var jsonParser = bodyParser.json();
var url = 'mongodb://localhost:27017/planeat';

function hash(pwd) {
  var hash = crypto.createHash('sha256');
  hash.update(pwd);
  return hash.digest('base64');
}

function sessionId() {
  return Math.floor(Math.random() * 10000000000000);
}

router.post('/', jsonParser, function(req, res) {
  var newUser = {
    username: req.body.user,
    pwd: hash(req.body.pwd),
    session: "",
    first: "",
    last: ""
  }
  mongoClient.connect(url, function(err, db) {
    if (!err) {
      var users = db.collection('users');
      users.insert(newUser, function(err, result) {
        if (!err) {
          res.sendStatus(201);
          db.close();
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
})

module.exports = router;
