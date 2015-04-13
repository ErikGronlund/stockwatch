'use strict';

var gulp = require('gulp');

gulp.task('dist', [
    'lint',
    'unit',
    'server',
    'client',
    'common-components'
]);