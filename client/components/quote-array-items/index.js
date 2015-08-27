'use strict';

function quoteArrayItems (array) {
  var quotedArray = array.map(function (item) {
    return '\"' + item + '\"'; 
  });

  return quotedArray;
}

module.exports = quoteArrayItems;