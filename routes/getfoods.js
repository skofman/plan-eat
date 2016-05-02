var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;

var url = 'mongodb://plan:eat@ds021711.mlab.com:21711/planeat';

router.get('/', function(req, res) {
  if (req.cookies.session) {
    mongoClient.connect(url, function(err, db) {
      if (!err) {
        var users = db.collection('users');
        users.find({session: Number(req.cookies.session)}).toArray(function(err, results) {
          if (!err) {
            var user = db.collection(results[0].username);
            user.find(req.query).toArray(function(err, results) {
              if (!err) {
                res.json(results).status(200);
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
        });
      }
      else {
        res.sendStatus(500);
      }
    })
  }
  else {
    res.sendStatus(401);
  }
})

module.exports = router;
