'use strict';

var React = require('react');

var StockQuote = require('../stock-quote/StockQuote');

module.exports = React.createClass({
  render: function () {
    var stockQuoteList = this.props.stockQuotes.map(function (stockQuote) {
      return <StockQuote data = {stockQuote} />
    });

    return (
      <table className="stock-quotes">
        <tr>
          <th>Name</th>
          <th>Symbol</th>
          <th>Exchange</th>
          <th>Price</th>
        </tr>
        {stockQuoteList}
      </table>
    );
  }
});