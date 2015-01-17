'use strict';

var gulp = require('gulp');
var lintspaces = require('gulp-lintspaces');

var paths = require('../paths');

gulp.task('lint-editorconfig', function ()  {
    return gulp.src(paths.src.lint.all)
        .pipe(lintspaces({
            editorconfig: '.editorconfig',
            ignores: [
                'js-comments',
                'java-comments'
            ]    
        }))
        .pipe(lintspaces.reporter());
});