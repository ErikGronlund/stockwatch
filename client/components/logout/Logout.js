'use strict';

var React = require('react');

module.exports = React.createClass({
  render: function () {
    return (
      <div className="button">
        <a href="/logout">Logout</a>
      </div>
    );
  }
});
