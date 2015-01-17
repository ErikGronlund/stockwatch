'use strict';

var expect = require('chai').expect;

var dummy = require('./dummy');

describe('dummy server', function () {
    it('says dummy', function () {
        expect(dummy.dummy === 'dummy').to.be.true;
    });
});