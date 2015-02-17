'use strict';

var gulp = require('gulp');
var mkdirp = require('mkdirp');
var source = require('vinyl-source-stream');
var transform = require('vinyl-transform');
var exorcist = require('exorcist');
var browserify = require('browserify');
var reactify = require('reactify');

var paths = require('../paths');

var bundler = browserify({
    // Specify the entry point of your app
    entries: [paths.src.indexjs],
    transform: [reactify],
    // Add file extensions to make optional in your requires, .js is default
    extensions: [],
    debug: true
});

gulp.task('client-scripts', function () {
    return bundler
        .bundle()

        // Use vinyl-source-stream to make the
        // stream gulp compatible. Specify the
        // desired output filename here.
        .pipe(source('bundle.js'))

        // use vinyl-transform to create a text transform stream from the vinyl stream
        .pipe(transform(function () {
            mkdirp.sync(paths.dest.sourcemaps);
            // Extract source map to its own file
            return exorcist(
                    paths.dest.sourcemaps + 'bundle.js.map',
                    paths.dest.sourcemaps + 'bundle.js.map'
            );
        }))
        .pipe(gulp.dest(paths.dest.client));
});