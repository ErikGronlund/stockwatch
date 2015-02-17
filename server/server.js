#!/usr/bin/env node
/* jshint node: true */
'use strict';

var path = require('path');
var express = require('express');
var app = express();

var port = process.env.PORT || 3000;
var staticDir = path.resolve(__dirname + '/client');

app.use(express.static(staticDir));
app.listen(port);

console.log('Serving ' + staticDir + '/ on http://localhost:' + port + '/');

app.get('/login', function (req, res) {
  res.send('Login using google');
});