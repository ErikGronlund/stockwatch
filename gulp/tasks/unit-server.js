'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');

var paths = require('../paths');

gulp.task('unit-server', function () {
    return gulp.src(paths.src.tests.server, {read: false})
        .pipe(mocha({reporter: 'progress'}));
});