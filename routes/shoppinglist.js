var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;
var moment = require('moment');

var url = 'mongodb://plan:eat@ds021711.mlab.com:21711/planeat';

router.get('/:increment', function(req, res) {
  var year = moment(moment().add(Number(req.params.increment), 'weeks')).weekYear();
  var week = moment(moment().add(Number(req.params.increment), 'weeks')).week();

  var term = year.toString() + week.toString();

  mongoClient.connect(url, function(err, db) {
    if (!err) {
      var users = db.collection('users');
      users.find({session: Number(req.cookies.session)}).toArray(function(err, results) {
        if (!err) {
          var user = db.collection(results[0].username);
          user.find({type: "calendar"}).toArray(function(err, results) {
            if (!err) {
              var calendar = results[0].weeks[term];
              user.find({type: "inventory"}).toArray(function(err, results) {
                if (!err) {
                  var inv = results[0].items;
                  res.json(makeList(calendar, inv)).status(200);
                }
                else {
                  res.sendStatus(500);
                }
                db.close();
              })
            }
            else {
              res.sendStatus(500);
              db.close();
            }
          })
        }
        else {
          res.sendStatus(500);
          db.close();
        }
      })
    }
    else {
      res.sendStatus(500);
    }
  })
})

function makeList(week, inv) {
  console.log(inv);
  var payload = {};
  var items = [];
  for (day in week) {
    for (item in week[day].items) {
      items.push(week[day].items[item]);
    }
  }
  for (var i = 0; i < items.length; i++) {
    if (items[i].type === 'recipe') {
      for (var j = 0; j < items[i].ingridients.length; j++) {
        if (!payload.hasOwnProperty(items[i].ingridients[j].item_id)) {
          payload[items[i].ingridients[j].item_id] = {};
          payload[items[i].ingridients[j].item_id].qty = items[i].qty * items[i].ingridients[j].qty;
          payload[items[i].ingridients[j].item_id].item_name = items[i].ingridients[j].item_name;
        }
        else {
          payload[items[i].ingridients[j].item_id].qty += (items[i].qty * items[i].ingridients[j].qty);
        }
      }
    }
    else {
      if (!payload.hasOwnProperty(items[i].item_id)) {
        payload[items[i].item_id] = {};
        payload[items[i].item_id].qty = items[i].qty;
        payload[items[i].item_id].item_name = items[i].item_name;
      }
      else {
        payload[items[i].item_id].qty += items[i].qty;
      }
    }
  }
  for (var i = 0; i < inv.length; i++) {
    if (payload.hasOwnProperty(inv[i].item_id)) {
      payload[inv[i].item_id].qty -= inv[i].qty;
      if (payload[inv[i].item_id].qty <= 0) {
        delete payload[inv[i].item_id];
      }
    }
  }
  return payload;
}

module.exports = router;
