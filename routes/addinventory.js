var express = require('express');
var router = express.Router();
var jsonParser = require('body-parser').json();
var mongoClient = require('mongodb').MongoClient;

var url = 'mongodb://plan:eat@ds021711.mlab.com:21711/planeat';

router.post('/', jsonParser, function(req, res) {
  mongoClient.connect(url, function(err, db) {
    if (!err) {
      var users = db.collection('users');
      users.find({session: Number(req.cookies.session)}).toArray(function(err, results) {
        if (!err) {
          var user = db.collection(results[0].username);
          user.find({type: 'inventory'}).toArray(function(err, results) {
            if (!err) {
              var exists = false;
              var inv = results[0].items;
              for (var i = 0; i < inv.length; i++) {
                if (req.body.item_id === inv[i].item_id) {
                  inv[i].qty += req.body.qty;
                  exists = true;
                  break;
                }
              }
              if (!exists) {
                inv.push(req.body);
              }
              user.update({type: 'inventory'}, {$set: {items: inv}});
              res.sendStatus(200);
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
    }
    else {
      res.sendStatus(500);
    }
  })
})

module.exports = router;
