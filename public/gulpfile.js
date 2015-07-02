var gulp = require('gulp');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var karma = require('karma').server;

gulp.task('watch', function() {
    gulp.watch(['src/**/*.jsx', 'src/**/*.js', 'less/**/*.less']).on('change', function(file) {
        gulp.start('webpack');
    });
});

gulp.task('webpack', function() {
    webpack(webpackConfig, function(error, status) {

    });
});

gulp.task('test', function(done) {
	karma.start( {configFile: __dirname + "/karma.conf.js", singleRun: true }, done );
});


gulp.task('default', ['webpack', 'watch']);