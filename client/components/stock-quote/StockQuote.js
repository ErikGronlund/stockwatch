'use strict';

var React = require('react');

module.exports = React.createClass({
  render: function () {
    return (
      <tr className="stock-quote">
        <td className="name">{this.props.data.Name}</td>
        <td className="symbol">{this.props.data.Symbol}</td>
        <td className="stock-exchange">{this.props.data.StockExchange}</td>
        <td className="last-trade-price">{this.props.data.LastTradePriceOnly + ' ' + this.props.data.Currency}</td>
      </tr>
    );
  }
});