'use strict';

var React = require('react');

module.exports = React.createClass({
  render: function () {
    return (
      <div>
        <form action="/addquote" method="post">
          Add symbol to list: <input type="text" name="symbol"></input>
          <button name="addQuote" type="submit">Add</button>
        </form>
      </div>
    );
  }
});