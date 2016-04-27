var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;
var jsonParser = require('body-parser').json();
var request = require('request');

var appId = '6ac9b6d1';
var appKey = '08e65f6fa81d4d32f1a24b5b153426a0';

var url = 'mongodb://plan:eat@ds021711.mlab.com:21711/planeat';

router.post('/', jsonParser, function(req, res) {
  var phrase = req.body.search.split(' ').join('%20') + '?';
  var apiUrl = "https://api.nutritionix.com/v1_1/search/" + phrase + "results=0%3A50&cal_min=0&cal_max=50000&fields=item_name%2Cbrand_name%2Citem_id%2Cbrand_id&appId=" + appId + "&appKey=" + appKey;
  request(apiUrl, function(err, response, body) {
    res.json(body).status(200);
  })
})

module.exports = router;
