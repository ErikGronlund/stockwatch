'use strict';

var React = require('react');

var Quotes = require('./quotes/Quotes');

var tickers = require('./tickers');

var YAHOO_FINANCE_URL = 'https://query.yahooapis.com/v1/public/yql';
var PARAMS = '&format=json&env=http://datatables.org/alltables.env&callback=';

function createFql() {
  return 'q=select * from yahoo.finance.quotes where symbol in (' + tickers.getQuotedTickers().toString() + ')';
}

function createUrl () {
  return YAHOO_FINANCE_URL + '?' + createFql() + PARAMS;
}

function loadQuotes(url) {
  return new Promise(function (resolve, reject) {

    function onload () {
      var json = JSON.parse(this.responseText);
      resolve(json.query.results.quote);
    }

    function onerror() {
      reject('failed fetching quotes from yahoo finance');
    }

    var xhr = new XMLHttpRequest();
    xhr.onload = onload;
    xhr.onerror = onerror;
    xhr.open('get', url, true);
    xhr.send();
  });
}

module.exports = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    var that = this;
    loadQuotes(createUrl()).then(function (quotes) {
      that.setState({ data: quotes});
    }, function (error) {
      console.log(error);
    });
  },
  render: function () {
    return (
      <div>
        <Quotes quotes={this.state.data} ></Quotes>
      </div>
    );
  }
});