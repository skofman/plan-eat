var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;
var moment = require('moment');
var jsonParser = require('body-parser').json();

var url = 'mongodb://plan:eat@ds021711.mlab.com:21711/planeat';

router.get('/', function(req, res) {
  if (req.cookies.session) {
    var payload = {};
    var year = moment(moment().add(Number(req.params.increment), 'weeks')).weekYear();
    var week = moment(moment().add(Number(req.params.increment), 'weeks')).week();

    var term = year.toString() + week.toString();
    var weekday = moment().format('dddd').toLowerCase();

    mongoClient.connect(url, function(err, db) {
      if (!err) {
        var users = db.collection('users');
        users.find({session: Number(req.cookies.session)}).toArray(function(err, results) {
          if (!err) {
            if (!results[0].goals) {
              payload.goals = false;
            }
            else {
              payload.goals = results[0].goals;
            }
            var user = db.collection(results[0].username);
            user.find({type: 'calendar'}).toArray(function(err, results) {
              if (!err) {
                var calendar = results[0].weeks;
                payload.day = calendar[term][weekday].day;
                payload.date = calendar[term][weekday].date;
                payload.items = calendar[term][weekday].items;
                res.json(payload).status(200);
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
  }
  else {
    res.sendStatus(401);
  }
})

router.put('/', jsonParser, function(req, res) {
  mongoClient.connect(url, function(err, db) {
    if (!err) {
      var users = db.collection('users');
      users.update({session: Number(req.cookies.session)}, {$set: {goals: req.body}});
      res.json(req.body).status(200);
    }
    else {
      res.sendStatus(500);
    }
  })
})

module.exports = router;
