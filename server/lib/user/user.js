var mongoose = require('mongoose')

var User = mongoose.model('User', {
  id: Number,
  name: String,
  tickers: Array
});

module.exports = User;
