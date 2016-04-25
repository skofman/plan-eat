var express = require('express');
var mongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');

var app = express();
var jsonParser = bodyParser.json();

var url = 'mongodb://localhost:27017/planeat';

app.use(express.static('./public'));

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log('Listening on port ' + port);
})
