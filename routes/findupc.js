var express = require('express');
var router = express.Router();
var jsonParser = require('body-parser').json();
var request = require('request');

router.post('/', jsonParser, function(req, res) {
  var upc = req.body.upc;
  while(upc.charAt(0) === "0") {
    upc = upc.slice(1);
  }
  var url = 'https://api.nutritionix.com/v1_1/item?upc=' + upc + '&appId=6ac9b6d1&appKey=08e65f6fa81d4d32f1a24b5b153426a0';
  request(url, function(err, response, body) {
    res.json(body).status(200);
  })
})

module.exports = router;
