'use strict';

var React = require('react');

var Logout = require('./logout/Logout');
var AddQuote = require('./add-quote/AddQuote');
var StockQuotes = require('./stock-quotes/StockQuotes');

var financeApi = require('./yahoo-finance-api');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      data: [],
      tickers: this.props.tickers || []
    };
  },
  componentDidMount: function() {
    var that = this;
    financeApi.loadStockQuotes(this.state.tickers).then(function (result) {
      var stockQuotes = [];
      if (!Array.isArray(result)) {
        stockQuotes.push(result)
      } else {
        stockQuotes = result;
      }

      that.setState({ data: stockQuotes});
    }, function (error) {
      console.log(error);
    });
  },
  render: function () {
    return (
      <div>
        <Logout></Logout>
        <StockQuotes stockQuotes={this.state.data} ></StockQuotes>
        <AddQuote></AddQuote>
      </div>
    );
  }
});