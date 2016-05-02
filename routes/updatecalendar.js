var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;
var jsonParser = require('body-parser').json();
var moment = require('moment');

var url = 'mongodb://plan:eat@ds021711.mlab.com:21711/planeat';

router.put('/:increment', jsonParser, function(req, res) {
  var year = moment(moment().add(Number(req.params.increment), 'weeks')).weekYear();
  var week = moment(moment().add(Number(req.params.increment), 'weeks')).week();

  var term = year.toString() + week.toString();

  mongoClient.connect(url, function(err, db) {
    if (!err) {
      var users = db.collection('users');
      users.find({session: Number(req.cookies.session)}).toArray(function(err, results) {
        if (!err) {
          console.log(results);
          var user = db.collection(results[0].username);
          user.find({type: 'calendar'}).toArray(function(err, results) {
            if (!err) {
              var weeks = results[0].weeks;
              weeks[term] = req.body;
              user.update({type: 'calendar'}, {$set: {weeks: weeks}});
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
