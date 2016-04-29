var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;
var jsonParser = require('body-parser').json();

var url = 'mongodb://plan:eat@ds021711.mlab.com:21711/planeat';

router.put('/', jsonParser, function(req, res) {
  mongoClient.connect(url, function(err, db) {
    if (!err) {
      var users = db.collection('users');
      users.find({session: Number(req.cookies.session)}).toArray(function(err, results) {
        if (!err) {
          var user = db.collection(results[0].username);
          console.log(req.body);
          user.update({item_id: req.body.item_id}, {$set: req.body});
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
