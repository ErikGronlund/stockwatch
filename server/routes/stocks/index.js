'use strict';

var router = require('express').Router();

var React = require('react');
var ReactDOMServer = require('react-dom/server');

var App = React.createFactory(require('../../components/App.js'));

router.get('/', function (req, res) {
  var reactLoginHtml = ReactDOMServer.renderToString(App({ stockSymbols: req.user.stockSymbols }));
  res.render('index.ejs', {reactContent: reactLoginHtml, stockSymbols: req.user.stockSymbols});
});

module.exports = router;
