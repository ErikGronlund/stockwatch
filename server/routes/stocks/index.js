'use strict';

var router = require('express').Router();

var React = require('react/addons');
var App = React.createFactory(require('../../components/App.js'));

router.get('/', function (req, res) {
  var reactLoginHtml = React.renderToString(App({ tickers: req.user.tickers }));
  res.render('index.ejs', {reactContent: reactLoginHtml, tickers: req.user.tickers});
});

module.exports = router;
