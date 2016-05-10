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
var additem = require('./routes/additem');
var getfoods = require('./routes/getfoods');
var deleteitem = require('./routes/deleteitem');
var updateitem = require('./routes/updateitem');
var getdate = require('./routes/getdate');
var updatecalendar = require('./routes/updatecalendar');
var getinventory = require('./routes/getinventory');
var addinventory = require('./routes/addinventory');
var updateinventory = require('./routes/updateinventory');
var gethome = require('./routes/gethome');
var shoppinglist = require('./routes/shoppinglist');
var findupc = require('./routes/findupc');

app.use(cookieParser());
app.use('/signup', signup);
app.use('/checkuser', checkuser);
app.use('/login', login);
app.use('/checklogin', checklogin);
app.use('/logout', logout);
app.use('/searchfoods', searchfoods);
app.use('/getitem', getitem);
app.use('/additem', additem);
app.use('/getfoods', getfoods);
app.use('/deleteitem', deleteitem);
app.use('/updateitem', updateitem);
app.use('/getdate', getdate);
app.use('/updatecalendar', updatecalendar);
app.use('/getinventory', getinventory);
app.use('/addinventory', addinventory);
app.use('/updateinventory', updateinventory);
app.use('/gethome', gethome);
app.use('/shoppinglist', shoppinglist);
app.use('/findupc', findupc);
app.use(express.static('./public'));

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Listening on port ' + port);
})
