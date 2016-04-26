var express = require('express');
var mongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var crypto = require('crypto');
var cookieParser = require('cookie-parser');

var app = express();
var jsonParser = bodyParser.json();

var url = 'mongodb://localhost:27017/planeat';
//routes
var signup = require('./routes/signup');
var checkuser = require('./routes/checkuser');
var login = require('./routes/login');
var checklogin = require('./routes/checklogin');
var logout = require('./routes/logout');

app.use(cookieParser());
app.use('/signup', signup);
app.use('/checkuser', checkuser);
app.use('/login', login);
app.use('/checklogin', checklogin);
app.use('/logout', logout);
app.use(express.static('./public'));

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log('Listening on port ' + port);
})
