var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');

router.get('/', function(req, res) {
  res.clearCookie('session');
  res.send();
})

module.exports = router;
