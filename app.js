var express = require('express');
var mongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var crypto = require('crypto');
var cookieParser = require('cookie-parser');

var app = express();
var jsonParser = bodyParser.json();

var url = 'mongodb://plan:eat@ds021711.mlab.com:21711/planeat';
//routes
var signup = require('./routes/signup');
var checkuser = require('./routes/checkuser');
var login = require('./routes/login');
var checklogin = require('./routes/checklogin');
var logout = require('./routes/logout');
var searchfoods = require('./routes/searchfoods');
var getitem = require('./routes/getitem');
var addcustom = require('./routes/addcustom');
var getfoods = require('./routes/getfoods');

app.use(cookieParser());
app.use('/signup', signup);
app.use('/checkuser', checkuser);
app.use('/login', login);
app.use('/checklogin', checklogin);
app.use('/logout', logout);
app.use('/searchfoods', searchfoods);
app.use('/getitem', getitem);
app.use('/addcustom', addcustom);
app.use('/getfoods', getfoods);
app.use(express.static('./public'));

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Listening on port ' + port);
})
