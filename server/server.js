#!/usr/bin/env node
/* jshint node: true */
'use strict';

var path = require('path');
var express = require('express');
var app = express();

require("node-jsx").install(); 

var port = process.env.PORT || 3000;
var staticDir = path.resolve(__dirname + '/client');

var React = require('react/addons');
var App = React.createFactory(require('./components/App.js'));

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  var reactLoginHtml = React.renderToString(App());
  res.render('index.ejs', {reactContent: reactLoginHtml});
});

app.get('/login', function (req, res) {
  res.send('Login using google');
});

app.use(express.static(staticDir));
app.listen(port);

console.log('Serving ' + staticDir + '/ on http://localhost:' + port + '/');

