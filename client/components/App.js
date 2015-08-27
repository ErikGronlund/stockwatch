'use strict';

var React = require('react');

var Logout = require('./logout/Logout');
var AddSearchForm = require('./add-search-form/AddSearchForm');
var StockQuotes = require('./stock-quotes/StockQuotes');

var financeApi = require('./yahoo-finance-api');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      data: [],
      stockSymbols: this.props.stockSymbols || []
    };
  },
  componentDidMount: function() {
    var that = this;
    financeApi.loadStockQuotes(this.state.stockSymbols).then(function (result) {
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
        <AddSearchForm></AddSearchForm>
      </div>
    );
  }
});