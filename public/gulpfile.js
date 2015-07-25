var gulp = require('gulp');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var karma = require('karma').server;
var gutil = require("gulp-util");
var fs = require("fs")

gulp.task('watch', function() {
    gulp.watch(['src/**/*', '!src/config.js', 'less/**/*'], ['webpack']);
});

var compiler = webpack(webpackConfig);
gulp.task('webpack', function() {
    gulp.start('set-variables');

    gutil.log('Webpack ', gutil.colors.green('file change detected! Starting to build...'));
    var startTime = new Date().getTime();

    compiler.run(function(error, stats) {
        if (error)
            throw new gutil.PluginError("webpack", error);

        var jsonStats = stats.toJson();
        if (jsonStats.errors.length > 0)
            gutil.log('Webpack ', gutil.colors.red("Error\n"), jsonStats.errors.join());
        if (jsonStats.warnings.length > 0)
            gutil.log('Webpack ', gutil.colors.yellow("Warning\n"), jsonStats.warnings.join());

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
