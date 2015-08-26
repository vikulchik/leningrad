'use strict';

var gulp = require('gulp'),
    scss = require('gulp-sass'),
    concat = require('gulp-concat'),
    webserver = require('gulp-webserver'),
    uglify = require('gulp-uglify'),
    compass = require('gulp-compass'),
    autoprefixer = require('gulp-autoprefixer'),
    jade = require('gulp-jade'),
    minifyCss = require('gulp-minify-css'),
    rename = require("gulp-rename"),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant');


/* ----- jade ----- */
gulp.task('jade', function () {
    gulp.src(['dev/jade/[^_]*.jade'])
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('prod/'))
});

/* ------ sass ------ */
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

/* -------- autoprefixer -------- */
gulp.task('autpr', function () {
    return gulp.src('dev/css/main.css')
        .pipe(autoprefixer(['> 5%', 'last 5 versions', 'IE 9']))
        .pipe(gulp.dest('dev/css'));
});


/* -------- minification CSS -------- */
gulp.task('minify-css', function () {
    return gulp.src('dev/css/main.css')
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(rename("main.min.css"))
        .pipe(gulp.dest('prod/css'));
});


/* -------- concat JS -------- */
gulp.task('concat', function () {
    return gulp.src('dev/js/modules/*.js')
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dev/js'));
});


/* -------- minification JS -------- */
gulp.task('compress', function () {
    return gulp.src('dev/js/app.js')
        .pipe(uglify())
        .pipe(rename("app.min.js"))
        .pipe(gulp.dest('prod/js'));
});


/* -------- images minification  -------- */
gulp.task('imagemin', function () {
    return gulp.src('dev/img/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('prod/img'));
});


/* -------- gulp server  -------- */
gulp.task('webserver', function () {
    gulp.src('prod')
        .pipe(webserver({
            livereload: true,
            open: true
        }));
});


/* -------- gulp watching  -------- */
gulp.task('watch', function () {
    gulp.watch('dev/jade/*.jade', ['jade']);
    gulp.watch('dev/scss/*.scss', ['compass']);
    gulp.watch('dev/css/*.css', ['autpr']);
    gulp.watch('dev/css/*.css', ['minify-css']);
    gulp.watch('dev/js/modules/*.js', ['concat']);
    gulp.watch('dev/js/app.js', ['compress']);
    gulp.watch('dev/img/**/*', ['imagemin']);
});


gulp.task('default', [
    'watch',
    'jade',
    'compass',
    'concat',
    'compress',
    'webserver'
]);




