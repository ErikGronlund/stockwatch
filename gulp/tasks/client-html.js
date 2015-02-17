'use strict';

var gulp = require('gulp');
var reload = require('browser-sync').reload;

var paths = require('../paths');

gulp.task('client-html', function () {
    return gulp.src(paths.src.html)
        .pipe(gulp.dest(paths.dest.client))
        .pipe(reload({stream:true}));
});
