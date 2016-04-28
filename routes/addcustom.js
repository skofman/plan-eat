var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;
var jsonParser = require('body-parser').json();

var url = 'mongodb://plan:eat@ds021711.mlab.com:21711/planeat';

router.post('/', jsonParser, function(req, res) {
  var payload = req.body;
  mongoClient.connect(url, function(err, db) {
    if (!err) {
      var users = db.collection('users');
      users.find({session: Number(req.cookies.session)}).toArray(function(err, results) {
        if (!err) {
          payload.type = 'food';
          payload.origin = 'custom';
          var user = db.collection(results[0].username);
          user.insert(payload, function(err, result) {
            res.json(payload).status(201);
          })
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
