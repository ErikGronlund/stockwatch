'use strict';

var router = require('express').Router();

var React = require('react/addons');
var App = React.createFactory(require('../../components/App.js'));

router.get('/', function (req, res) {
  var reactLoginHtml = React.renderToString(App({ stockSymbols: req.user.stockSymbols }));
  res.render('index.ejs', {reactContent: reactLoginHtml, stockSymbols: req.user.stockSymbols});
});

module.exports = router;
