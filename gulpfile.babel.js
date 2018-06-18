'use strict';

const gulp         = require('gulp');
const browserSync  = require('browser-sync').create();
const sass         = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const rename       = require("gulp-rename");
const gulpIf       = require('gulp-if');
const uglify       = require('gulp-uglify');
const babel        = require('gulp-babel');
const imagemin     = require('gulp-imagemin');
const cache        = require('gulp-cache');
const del          = require('del');

gulp.task('clean:dist', () => {
  //return del(['dist']);
  return del.sync('dist');
});

gulp.task('cache:clear', () => {
  return cache.clearAll();
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], () =>{
  // Set root of the server
  browserSync.init({
      server: './src'
  });
  // Watchers
  gulp.watch('src/scss/*.scss', ['sass']);
  gulp.watch('src/js/*.js', ['scripts']);
  gulp.watch('src/img/**/*.+(png|jpg|jpeg|gif|svg)', ['images']);
  gulp.watch('src/*.html').on('change', browserSync.reload);
});

// Optimize images before copying to src/img folder
gulp.task('images', () =>{
  return gulp.src('src/img/**/*.+(png|jpg|jpeg|gif|svg)')
  .pipe(cache(imagemin([
    imagemin.gifsicle({interlaced: true}),
    imagemin.jpegtran({progressive: true}),
    imagemin.optipng({optimizationLevel: 5}),
    imagemin.svgo({
        plugins: [
            {removeViewBox: true},
            {cleanupIDs: false}
        ]
    })
  ])))
  .pipe(gulp.dest('src/dist/img'));
});


// Copy the font files into our /src/css folder if exist
gulp.task('fonts', () => {
  return gulp.src('src/scss/fonts/*')
  .pipe(gulp.dest('src/dist/css/fonts'));
})

// Copy the css files into our /src/js folder
gulp.task('css', () => {
    return gulp.src(['node_modules/bootstrap/dist/css/bootstrap.min.css'])
        .pipe(gulp.dest('src/dist/css'));
});

// Copy the javascript files into our /src/js folder
gulp.task('js', () => {
    return gulp.src(['node_modules/jquery/dist/jquery.min.js', 'node_modules/bootstrap/dist/js/bootstrap.min.js',  'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'])
        .pipe(gulp.dest('src/dist/js'));
});

// Compile scss into CSS & auto-inject into browsers
// if update bootstrap css, add 'node_modules/bootstrap/scss/bootstrap.scss'
gulp.task('sass', () => {
    return gulp.src(['src/scss/*.scss'])
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError)) // Converts Sass to CSS with gulp-sass
        .pipe(autoprefixer())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('src/dist/css'))
        .pipe(browserSync.stream()); // auto-inject into browsers
});

// Build JavaScript files
gulp.task('scripts', () => {
    return gulp.src(['src/js/*.js'])
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(gulpIf('*.js', uglify()))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('src/dist/js'))
    .pipe(browserSync.stream()); // auto-inject into browsers;
});

// set default task to run on start
gulp.task('default', ['clean:dist', 'images', 'fonts', 'css', 'js', 'serve']);
