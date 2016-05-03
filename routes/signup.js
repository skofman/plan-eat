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

router.post('/', jsonParser, function(req, res) {
  var newUser = {
    username: req.body.user,
    pwd: hash(req.body.pwd),
    session: ""
  }
  mongoClient.connect(url, function(err, db) {
    if (!err) {
      db.createCollection(newUser.username);
      var user = db.collection(newUser.username);
      user.insert({type: 'inventory', items: []});
      user.insert({type: 'calendar', weeks: {}});
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
