#!/usr/bin/env node
/* jshint node: true */
'use strict';

var path = require('path');
var express = require('express');
var app = express();

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var GOOGLE_CLIENT_ID = '37422223575-gbp1smusgb1d6k1m9qjs80s97t6uv5f1.apps.googleusercontent.com';
var GOOGLE_CLIENT_SECRET = 'aHAqRWXrX_It7bnLMm0h4n0j';

require("node-jsx").install();

var port = process.env.PORT || 3000;
var staticDir = path.resolve(__dirname + '/client');

var login = require('./routes/login');
var stocks = require('./routes/stocks');

var passport = require('passport');

app.use(express.static(staticDir));
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({secret: 'stockWatch', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());

// TODO implement using db storage
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

var StrategyGoogle = require('passport-google-openidconnect').Strategy;
passport.use(new StrategyGoogle({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/google/callback",
    userInfoURL: "https://www.googleapis.com/plus/v1/people/me"
  },
  function(iss, sub, profile, accessToken, refreshToken, done) {
    // TODO add db storage for handling users
    return done(null, accessToken);
  }
));

// routes
app.get('/auth/google',
  passport.authenticate('google-openidconnect'));

app.get('/auth/google/callback',
  passport.authenticate('google-openidconnect', { failureRedirect: '/login', successRedirect: '/' }));

app.use('/login', login);
app.use('/', ensureAuthenticated, stocks);

app.listen(port);

console.log('Serving ' + staticDir + '/ on http://localhost:' + port + '/');

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  req.session.error = 'Please sign in!';
  res.redirect('/login');
}

