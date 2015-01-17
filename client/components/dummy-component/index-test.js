'use strict';

var expect = require('chai').expect;

var dummy = require('./index');

describe('dummy component', function () {
    it('should say hej', function () {
        expect(dummy.hej === 'hej').to.be.true;
    });
});