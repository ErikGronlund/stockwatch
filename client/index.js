'use strict';

var React = require('react');
var App = require('./components/App');

React.render(<App tickers={window.STOCKWATCH_TICKERS}/>, document.body);
