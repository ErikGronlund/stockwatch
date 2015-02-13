'use strict';

var React = require('react');

var Quote = require('../quote/Quote');

module.exports = React.createClass({
  render: function () {
    var quoteList = this.props.quotes.map(function (quote) {
      return <Quote data = {quote} />
    });

    return (
      <table className="quotes">
        <tr>
          <th>Name</th>
          <th>Symbol</th>
          <th>Exchange</th>
          <th>Price</th>
        </tr>
        {quoteList}
      </table>
    );
  }
});