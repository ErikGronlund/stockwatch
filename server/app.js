#!/usr/bin/env node
/* jshint node: true */
'use strict';

var path = require('path');
var express = require('express');
var app = express();

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var mongoose = require('mongoose');
var User = require('./lib/user/user.js');

var GOOGLE_CLIENT_ID = '37422223575-gbp1smusgb1d6k1m9qjs80s97t6uv5f1.apps.googleusercontent.com';
var GOOGLE_CLIENT_SECRET = 'aHAqRWXrX_It7bnLMm0h4n0j';

var FACEBOOK_APP_ID = '697434750383550';
var FACEBOOK_APP_SECRET = 'ab9c7bb908e306026793b97463b6c1da';

require("node-jsx").install();

var staticDir = path.resolve(__dirname + '/client');

var login = require('./routes/login');
var logout = require('./routes/logout');
var stocks = require('./routes/stocks');

var passport = require('passport');

mongoose.connect('mongodb://localhost/stockwatch');

app.use(express.static(staticDir));
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({secret: 'stockWatch', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());

var StrategyGoogle = require('passport-google-openidconnect').Strategy;
passport.use(new StrategyGoogle({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/google/callback",
    userInfoURL: "https://www.googleapis.com/plus/v1/people/me"
  },
  function(iss, sub, profile, accessToken, refreshToken, done) {
    User.findOne({ id: profile._json.id }, function (err, user) {
      if (err) {
        return done(err);
      } else if (user !== null) {
        return done(null, user);
      } else {
        var user = new User({
          id: profile._json.id,
          name: profile._json.displayName,
          tickers: ['GOOG', 'BOL.ST', 'ALFA.ST']
        });

        user.save(function (err) {
          if (err) {
            return done(err);
          } else {
            return done(null, user);
          }
        });
      }
    });
  }
));

var StrategyFacebook = require('passport-facebook').Strategy;
passport.use(new StrategyFacebook({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/facebook/callback",
    enableProof: false,
    profileFields: ['id', 'displayName', 'photos']
  },
  function (accessToken, refreshToken, profile, done) {
    User.findOne({ id: profile._json.id }, function (err, user) {
      if (err) {
        return done(err);
      } else if (user !== null) {
        return done(null, user);
      } else {
        var user = new User({
          id: profile._json.id,
          name: profile._json.name,
          tickers: ['FB', 'BOL.ST', 'ALFA.ST']
        });

        user.save(function (err) {
          if (err) {
            return done(err);
          } else {
            return done(null, user);
          }
        });
      }
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      done(err);
    } else {
      done(null, user);
    }
  });
});

// routes
app.get('/auth/google',
  passport.authenticate('google-openidconnect'));

app.get('/auth/google/callback',
  passport.authenticate('google-openidconnect', { failureRedirect: '/login', successRedirect: '/' }));

app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login', successRedirect: '/' }));

app.use('/login', login);
app.use('/logout', logout);
app.use('/', ensureAuthenticated, stocks);

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  req.session.error = 'Please sign in!';
  res.redirect('/login');
}

module.exports = app;