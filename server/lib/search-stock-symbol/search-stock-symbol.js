'use strict';

var http = require('http');

var YAHOO_SYMBOL_LOOKUP_URL = 'http://autoc.finance.yahoo.com/autoc';
var YAHOO_SYMBOL_LOOKUP_QUERY = '?query='
var YAHOO_SYMBOL_LOOKUP_PARAMS = '&callback=YAHOO.Finance.SymbolSuggest.ssCallback'

function createUrlFromSymbol(symbol) {
  return YAHOO_SYMBOL_LOOKUP_URL + YAHOO_SYMBOL_LOOKUP_QUERY + symbol + YAHOO_SYMBOL_LOOKUP_PARAMS;
}

function searchStockSymbol(req, res, next) {
  var url = createUrlFromSymbol(req.query.searchParam);
  var body = '';
  http.get(url, function(response) {
    response.on('data', function (d) {
      body += d;
    });

    response.on('end', function () {
      // remove json prefix string sent from yahoo before returning result
      var jsonResponseString = body.substring(body.indexOf('(') + 1, body.lastIndexOf(')'));
      var result = JSON.parse(jsonResponseString);
      req.symbolSearchResult = result.ResultSet.Result;
      next();
    });

  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });
}

module.exports = searchStockSymbol;