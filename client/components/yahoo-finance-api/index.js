'use strict';

var quoteArrayItems = require('../quote-array-items');

var YAHOO_FINANCE_URL = 'https://query.yahooapis.com/v1/public/yql';
var YAHOO_FINANCE_PARAMS = '&format=json&env=http://datatables.org/alltables.env&callback=';

function createFql(symbols) {
  return 'q=select * from yahoo.finance.quotes where symbol in (' + quoteArrayItems(symbols).toString() + ')';
}

function createUrl (symbols) {
  return YAHOO_FINANCE_URL + '?' + createFql(symbols) + YAHOO_FINANCE_PARAMS;
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

function loadStockQuotes(symbols) {
  return loadStockQuotesUrl(createUrl(symbols));
}

module.exports = {
  loadStockQuotes: loadStockQuotes
};