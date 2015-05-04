#!/usr/bin/env node
/* jshint node: true */
'use strict';

var http = require('http');
var app = require('./app.js');

var port = process.env.PORT || 3000;

var server = http.createServer(app);
server.app = app;
server.listen(port);

console.log('Server started on http://localhost:' + port + '/');

