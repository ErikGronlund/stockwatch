'use strict';

var http = require('http');

var YAHOO_SYMBOL_LOOKUP_URL = 'http://autoc.finance.yahoo.com/autoc';
var YAHOO_SYMBOL_LOOKUP_QUERY = '?query='
var CALLBACK_PARAM = '&callback=YAHOO.Finance.SymbolSuggest.ssCallback';
var REGION_US_PARAM = '&region=us';
var LANG_US_PARAM = '&lang=en-US';
var YAHOO_SYMBOL_LOOKUP_PARAMS = CALLBACK_PARAM + REGION_US_PARAM + LANG_US_PARAM;

function createUrlFromQuery(query) {
  return YAHOO_SYMBOL_LOOKUP_URL + YAHOO_SYMBOL_LOOKUP_QUERY + query + YAHOO_SYMBOL_LOOKUP_PARAMS;
}

function searchMatchingStocks(req, res, next) {
  var url = createUrlFromQuery(req.query.searchParam);
  var body = '';
  http.get(url, function(response) {
    response.on('data', function (d) {
      body += d;
    });

    response.on('end', function () {
      // remove json prefix string sent from yahoo before returning result
      var jsonResponseString = body.substring(body.indexOf('(') + 1, body.lastIndexOf(')'));
      var result = JSON.parse(jsonResponseString);
      req.stockSearchResult = result.ResultSet.Result;
      next();
    });

  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });
}

module.exports = searchMatchingStocks;