'use strict';

var gulp = require('gulp'),
    scss = require('gulp-sass'),
    concat = require('gulp-concat'),
    webserver = require('gulp-webserver'),
    uglify = require('gulp-uglify'),
    compass = require('gulp-compass'),
    autoprefixer = require('gulp-autoprefixer'),
    jade = require('gulp-jade'),
    minifyCss = require('gulp-minify-css');




//jade
gulp.task('jade', function () {
    gulp.src(['dev/jade/[^_]*.jade'])
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('dev/'))
});

gulp.task('compass', function () {
    gulp.src('dev/scss/*.scss')
        .pipe(compass({
            config_file: 'config.rb',
            css: 'dev/css',
            sass: 'dev/scss',
            sourcemap: true
        }))
        .pipe(gulp.dest('dev/css'));
});

gulp.task('autpr', function () {
    return gulp.src('dev/css/main.css')
        .pipe(autoprefixer(['> 5%', 'last 5 versions', 'IE 9']))
        .pipe(gulp.dest('dev/css'));
});

gulp.task('minify-css', function() {
    return gulp.src('dev/css/*.css')
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(gulp.dest('prod/css'));
});


gulp.task('watch', function () {
    gulp.watch('dev/jade/*.jade', ['jade']);
    gulp.watch('dev/scss/*.scss', ['compass']);
    gulp.watch('dev/css/*.css', ['autpr']);
    gulp.watch('dev/css/*.css', ['minify-css']);

});

gulp.task('webserver', function () {
    gulp.src('dev')
        .pipe(webserver({
            livereload: true,
            open: true
        }));
});


gulp.task('default', [
    'watch',
    'jade',
    'compass',
    'webserver'
]);

