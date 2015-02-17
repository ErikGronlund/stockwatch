'use strict';

module.exports = {
    src: {
        lint: {
            all: [
                '*',
                '{client,server,gulp,docs,environment}/**/*',
                '!client/bower-components/**',
                '!client/node_modules/**',
                '!**/*.{log,tgz,pdf,png,jpg,eot,svg,ttf,woff,gif,ico}'
            ],
            js: [
                '*.js',
                '{client,server,gulp,environment}/**/*.js',
                '!client/bower-components'
            ]
        },
        server: [
            'server/**',
            '!server/**/*-test.js'
        ],
        tests: {
            client: 'client/**/*-test.js',
            server: 'server/**/*-test.js'
        },
        client: {
            images: './client/**/*.{png,jpg,jpeg,gif,ico,svg,eot,ttf,woff}',
            less: './client/**/*.less',
            html: './client/**/*.html',
            js: './client/**/*.js',
            indexjs: './client/index.js',
            indexless: './client/index.less'
        }
    },
    dest: {
        server: 'dist/',
        client: 'dist/client',
        indexjs: 'dist/client',
        sourcemaps: 'dist/client/sourcemaps/'
    }
};