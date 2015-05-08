'use strict';

/*var tickers = [
  'ALFA.ST', // Alfa Laval
  'AXFO.ST', // Axfood
  'BOL.ST', // Boliden
  'CLAS-B.ST', // Clas Ohlson
  'FIX-B.ST', // Fenix Outdoor
  'HM-B.ST', // Hennes & Mauritz
  'ICA.ST', // ICA
  'INVE-B.ST', // Investor
  'LUND-B.ST', // Lundbergföretagen
  'NET-B.ST', // Net Entertainment
  'SCA-B.ST', // SCA
  'SKIS-B.ST', // SkiStar
  'STL.OL', // Statoil
  'SHB-B.ST', // Handelsbanken
  'SKF-B.ST',
  'THULE.ST' // Thule
];*/

function quoteArrayItems (array) {
  var quotedArray = array.map(function (item) {
    return '\"' + item + '\"'; 
  });

  return quotedArray;
}

module.exports = quoteArrayItems;