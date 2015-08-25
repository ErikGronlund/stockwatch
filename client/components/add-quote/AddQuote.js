'use strict';

var React = require('react');

var financeApi = require('../yahoo-finance-api');

module.exports = React.createClass({
  getInitialState: function() {
    return {showAddButton: false, searchResult: []};
  },
  searchSymbol: function (req) {
    var that = this;
    function onload () {
      var json = JSON.parse(this.responseText);
      that.setState({showAddButton: json.length > 0, searchResult: json});
    }

    function onerror() {
      reject('failed searching symbol from server');
    }

    var searchValue = encodeURIComponent(document.getElementById('searchField').value);

    var xhr = new XMLHttpRequest();
    xhr.onload = onload;
    xhr.onerror = onerror;
    xhr.open('get', '/searchsymbol?searchParam=' + searchValue, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send();
  },
  render: function () {
    var button;

    var options = this.state.searchResult.map(function (data) {
      return <option value={data.symbol}>{data.symbol}</option>
    });

    {
      if (this.state.showAddButton) {
        button =  <div>
                    <form action="/addquote" method="post">
                      Add stock to list:
                      <select name="selectedSymbol">
                        { options }
                      </select>
                      <button name="addQuote" type="submit" >Add</button>
                    </form>
                  </div>;
      } else {
        button =  <div>
                      Search stock symbol: <input type="text" name="symbol" id="searchField"></input>
                      <button name="searchSymbol" onClick={this.searchSymbol}>Search</button>
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