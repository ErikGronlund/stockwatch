'use strict';

var React = require('react');
var App = require('./components/App');

React.render(<App stockSymbols={window.STOCKWATCH_SYMBOLS}/>, document.body);
