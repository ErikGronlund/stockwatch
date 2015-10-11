'use strict';

var router = require('express').Router();

module.exports = function (User) {
  router.post('/', function addstock(req, res, next) {
    User.findOne({ id: req.user.id }, function (err, user) {
      if (err || user === null) {
        return next(new Error('User not found'));
      } else if (user !== null) {
        if (!!req.body.selectedSymbol) {
          // add stock symbol to user
          user.stockSymbols.push(req.body.selectedSymbol);
          user.save(function (err) {
            if (err) {
              return next(new Error('Failed to add new symbol to database'));
            } else {
              res.redirect('/');
            }
          });
        } else {
          res.redirect('/');
        }
      } else {
        return next(new Error('Unknown error'));
      }
    });
  });

  return router;
};