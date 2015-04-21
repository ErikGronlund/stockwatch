'use strict';

var gulp = require('gulp');
var del = require('del');

var paths = require('../paths');

gulp.task('clean', function () {
    return del.sync(paths.dest.all);
});