'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');

var paths = require('../paths');

gulp.task('lint-jshint', function ()  {
    return gulp.src(paths.src.lint.js)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});