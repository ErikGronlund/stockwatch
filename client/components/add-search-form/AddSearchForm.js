'use strict';

var React = require('react');

var financeApi = require('../yahoo-finance-api');

module.exports = React.createClass({
  getInitialState: function() {
    return {searchResult: []};
  },
  searchStock: function (req) {
    var that = this;
    function onload () {
      var json = JSON.parse(this.responseText);
      that.setState({searchResult: json});
    }

    function onerror() {
      reject('failed search matching stocks from server');
    }

    var searchValue = encodeURIComponent(document.getElementById('searchField').value);

    var xhr = new XMLHttpRequest();
    xhr.onload = onload;
    xhr.onerror = onerror;
    xhr.open('get', '/searchstock?searchParam=' + searchValue, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send();
  },
  render: function () {
    var button;

    var options = this.state.searchResult.map(function (data) {
      return <option value={data.symbol}>{data.symbol}</option>
    });

    {
      if (this.state.searchResult.length > 0) {
        button =  <div>
                    <form action="/addquote" method="post">
                      <select name="selectedSymbol">
                        { options }
                      </select>
                      <button name="addQuote" type="submit" >Add stock symbol</button>
                    </form>
                  </div>;
      } else {
        button =  <div>
                      <input type="text" name="searchField" id="searchField"></input>
                      <button name="searchStock" onClick={this.searchStock}>Search for stock</button>
                  </div>;
      }
    }

    return (
      <div>
        { button }
      </div>
    );
  }
});