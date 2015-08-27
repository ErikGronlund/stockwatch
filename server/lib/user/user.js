var mongoose = require('mongoose')

var User = mongoose.model('User', {
  id: Number,
  name: String,
  stockSymbols: Array
});

module.exports = User;
