'use strict';

var browserSync = require('browser-sync');
var gulp = require('gulp');

var paths = require('../paths');

gulp.task('browser-sync', ['client'], function () {
    browserSync.init([
            paths.dest.client + '**',
            '!**/*.map'
    ], {
        server: {
            baseDir: paths.dest.client
        },
        open: false
    });
});