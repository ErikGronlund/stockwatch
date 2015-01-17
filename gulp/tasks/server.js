'use strict';

var gulp = require('gulp');

var paths = require('../paths');

gulp.task('server', function () {
    return gulp
        .src(paths.src.server)
        .pipe(gulp.dest(paths.dest.server));
});