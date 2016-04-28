var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;
var jsonParser = require('body-parser').json();

var url = 'mongodb://plan:eat@ds021711.mlab.com:21711/planeat';

router.delete('/', jsonParser, function(req, res) {
  mongoClient.connect(url, function(err, db) {
    if (!err) {
      var users = db.collection('users');
      users.find({session: Number(req.cookies.session)}).toArray(function(err, results) {
        if (!err) {
          var user = db.collection(results[0].username);
          user.remove({item_id: req.query.id});
          res.sendStatus(200);
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
