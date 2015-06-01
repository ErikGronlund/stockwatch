'use strict';

var quoteArrayItems = require('../quote-array-items');

var YAHOO_FINANCE_URL = 'https://query.yahooapis.com/v1/public/yql';
var YAHOO_FINANCE_PARAMS = '&format=json&env=http://datatables.org/alltables.env&callback=';

function createFql(tickers) {
  return 'q=select * from yahoo.finance.quotes where symbol in (' + quoteArrayItems(tickers).toString() + ')';
}

function createUrl (tickers) {
  return YAHOO_FINANCE_URL + '?' + createFql(tickers) + YAHOO_FINANCE_PARAMS;
}

function loadStockQuotesUrl(url) {
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

function loadStockQuotes(tickers) {
  return loadStockQuotesUrl(createUrl(tickers));
}

module.exports = {
  loadStockQuotes: loadStockQuotes
};