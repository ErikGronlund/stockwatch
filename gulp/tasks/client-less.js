'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var reload = require('browser-sync').reload;

var paths = require('../paths');

gulp.task('client-less', function () {
    return gulp
        .src(paths.src.client.indexless)
        .pipe(less({ style: 'expanded' }))
        .pipe(gulp.dest(paths.dest.client))
        .pipe(reload({stream:true}));
});
