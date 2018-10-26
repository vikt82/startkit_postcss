'use strict';

var postcss = require('gulp-postcss');
var gulp = require('gulp');

// Style
var sass = require('gulp-sass');
sass.compiler = require('node-sass');

var browserSync = require('browser-sync').create();

var paths = {
    // sass: ['client/js/**/*.coffee', '!client/external/**/*.coffee'],
    sass: ['dev/sass/**/*.sass', 'dev/sass/**/*.scss']
    // images: 'client/img/**/*'
};

/// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./build"
    });

    gulp.watch(paths.sass, ['sass']);
    gulp.watch("build/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(paths.sass)
        .pipe(sass())
        .pipe(gulp.dest("build/css"))
        .pipe(browserSync.stream());
});

gulp.task('css', function () {
    var plugins = [
        autoprefixer({browsers: ['last 1 version']}),
        cssnano()
    ];
    return gulp.src('./src/*.css')
        .pipe(postcss(plugins))
        .pipe(gulp.dest('./dest'));
});

gulp.task('default', ['serve']);