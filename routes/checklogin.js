var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;

var url = 'mongodb://plan:eat@ds021711.mlab.com:21711/planeat';

router.get('/', function(req, res) {
  mongoClient.connect(url, function(err, db) {
    if (!err) {
      var users = db.collection('users');
      users.find({session: Number(req.cookies.session)}).toArray(function(err, results) {
        if (!err) {
          if (results.length != 0) {
            res.sendStatus(200);
          }
          else {
            res.sendStatus(500);
          }
          db.close();
        }
        else {
          res.sendStatus(500);
        }
      })
    }
  })
});

module.exports = router;
