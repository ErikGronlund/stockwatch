'use strict';

var gulp = require('gulp');

var paths = require('../paths');

gulp.task('watch', ['browser-sync'], function () {
    gulp.watch(paths.src.watch.client.images, ['client']);
    gulp.watch(paths.src.watch.client.less, ['client']);
    gulp.watch(paths.src.watch.client.html, ['client']);
    gulp.watch(paths.src.watch.client.js, ['unit-client', 'client']);
});