var gulp = require('gulp');
var react = require('gulp-react');
var inject = require('gulp-inject');
var bowerFiles = require('main-bower-files');
var run = require('gulp-run');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');

gulp.task('watch', function() {
    gulp.watch(['src/**/*.jsx', 'src/**/*.js', 'less/**/*.less']).on('change', function(file) {
        gulp.start('webpack');
    });
});

gulp.task('webpack', function() {
    webpack(webpackConfig, function(error, status) {

    });
});


gulp.task('default', ['webpack', 'watch']);