var express = require('express');
var router = express.Router();
var jsonParser = require('body-parser').json();
var request = require('request');

var appId = '6ac9b6d1';
var appKey = '08e65f6fa81d4d32f1a24b5b153426a0';

router.post('/', jsonParser, function(req, res) {
  var apiUrl = "https://api.nutritionix.com/v1_1/item?id=" + req.body.id + "&appId=" + appId + "&appKey=" + appKey;
  request(apiUrl, function(err, response, body) {
    res.send(body).status(200);
  })
})

module.exports = router;
