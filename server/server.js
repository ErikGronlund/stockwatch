#!/usr/bin/env node
/* jshint node: true */
'use strict';

var path = require('path');
var express = require('express');
var app = express();

require("node-jsx").install();

var port = process.env.PORT || 3000;
var staticDir = path.resolve(__dirname + '/client');

var login = require('./routes/login');
var stocks = require('./routes/stocks');

app.set('view engine', 'ejs');

app.use('/', stocks);
app.use('/login', login);

app.use(express.static(staticDir));
app.listen(port);

console.log('Serving ' + staticDir + '/ on http://localhost:' + port + '/');

