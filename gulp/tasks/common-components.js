'use strict';

var gulp = require('gulp');

var paths = require('../paths');

gulp.task('common-components', function () {
    return gulp
        .src(paths.src.components.js)
        .pipe(gulp.dest(paths.dest.components));
});