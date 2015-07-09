var gulp = require('gulp');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var karma = require('karma').server;
var gutil = require("gulp-util");
var fs = require("fs")

gulp.task('watch', function() {
    gulp.watch(['src/**/*.jsx', 'src/**/*.js', 'src/**/*.less']).on('change', function(file) {
        gulp.start('webpack');
    });
});

gulp.task('webpack', function() {
    gulp.start('set-variables');

    gutil.log('Webpack ', gutil.colors.green('file change detected! Starting to build...'));
    var startTime = new Date().getTime();

    webpack(webpackConfig, function(error, stats) {
        if(error) throw new gutil.PluginError("webpack", error);

        var endTime = new Date().getTime();
        var timeSpent = endTime - startTime;
        gutil.log('Webpack ', gutil.colors.green('build completed!'), gutil.colors.magenta(timeSpent+' s'));

    });

});

gulp.task('set-variables', function(){
    fs.writeFileSync('src/config.js', "module.exports = '" + process.env.GOOGLE_API_CLIENT + "';");
});

gulp.task('test', function(done) {
	karma.start( {configFile: __dirname + "/karma.conf.js", singleRun: true }, done );
});


gulp.task('default', ['webpack', 'watch']);