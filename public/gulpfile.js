var gulp = require('gulp');
var react = require('gulp-react');
var inject = require('gulp-inject');
var bowerFiles = require('main-bower-files');

var paths = {
    js: ['src/**/*.js'],
    jsx: ['src/**/*.jsx'],
    jsDist: ['dist/**/*.js']
};

var compileJsx = function(path) {
    var destPath;

    if(typeof path == "string")  {
        destPath = 'dist/' + path.split("/src/")[1];
        destPath = destPath.split(/\/[A-Za-z0-9]{1,}.jsx/)[0];
    }
    else {
        destPath = 'dist';
    }

    gulp.src(path)
        .pipe(react())
        .pipe(gulp.dest(destPath));  
}

gulp.task('copyJs', function() {
    gulp.src(paths.js)
        .pipe(gulp.dest('dist'));
})

gulp.task('index', function () {
    var bowerSources = gulp.src(bowerFiles(), {read: false});
    var sources = gulp.src(paths.jsDist, {read: false});
 
    gulp.src('./template/index.html')
        .pipe(inject(bowerSources, {name: 'bower'}))
        .pipe(inject(sources))
        .pipe(gulp.dest('./'));
});

gulp.task('build', function() {
    compileJsx(paths.jsx);
    gulp.start('copyJs', 'index');
});

gulp.task('watch', function() {
    gulp.watch(paths.jsx).on('change', function(file) {
        compileJsx(file.path);
    });
});

gulp.task('default', ['build', 'watch']);