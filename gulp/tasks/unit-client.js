'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');

var paths = require('../paths');

gulp.task('unit-client', function () {
    return gulp.src(paths.src.tests.client, {read: false})
        .pipe(mocha({reporter: 'progress'}));
});