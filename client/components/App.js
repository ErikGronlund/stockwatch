'use strict';

var React = require('react');

var Logout = require('./logout/Logout');
var Quotes = require('./quotes/Quotes');
var quoteArrayItems = require('./quote-array-items');

var YAHOO_FINANCE_URL = 'https://query.yahooapis.com/v1/public/yql';
var PARAMS = '&format=json&env=http://datatables.org/alltables.env&callback=';

function createFql(tickers) {
  return 'q=select * from yahoo.finance.quotes where symbol in (' + quoteArrayItems(tickers).toString() + ')';
}

function createUrl (tickers) {
  return YAHOO_FINANCE_URL + '?' + createFql(tickers) + PARAMS;
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
    return {
      data: [],
      tickers: this.props.tickers || []
    };
  },
  componentDidMount: function() {
    var that = this;
    loadQuotes(createUrl(this.state.tickers)).then(function (result) {
      var quotes = [];
      if (!Array.isArray(result)) {
        quotes.push(result)
      } else {
        quotes = result;
      }

      that.setState({ data: quotes});
    }, function (error) {
      console.log(error);
    });
  },
  render: function () {
    return (
      <div>
        <Logout></Logout>
        <Quotes quotes={this.state.data} ></Quotes>
      </div>
    );
  }
});