'use strict';

var router = require('express').Router();

router.get('/', function (req, res) {
  res.send('Login using google');
});

module.exports = router;