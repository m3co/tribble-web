'use strict';
const gulp = require('gulp');
const htmlhint = require("gulp-htmlhint");
const eslint = require('gulp-eslint');
const sass = require('gulp-sass');

const paths = {
  src: 'src', dst: 'dist',
  assetssrc: ['src/assets/*', 'src/assets/**/*'],
  assetsdst: 'dist/assets',
  sasssrc: ['src/*.scss', 'src/**/*.scss'],
  htmlsrc: ['src/*.html', 'src/**/*.html'],
  jssrc: ['src/*.js', 'src/**/*.js']
};

gulp.task('sass', function () {
  return gulp.src(paths.sasssrc)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.dst));
});

gulp.task('assets-copy', _ => {
  return gulp.src(paths.assetssrc)
    .pipe(gulp.dest(paths.assetsdst));
});

gulp.task('html-hint', _ => {
  return gulp.src(paths.htmlsrc)
    .pipe(htmlhint())
    .pipe(htmlhint.reporter());
});

gulp.task('html-copy', _ => {
  return gulp.src(paths.htmlsrc)
    .pipe(gulp.dest(paths.dst));
});

gulp.task('html-build', ['html-hint', 'html-copy']);

gulp.task('js-eslint', _ => {
  return gulp.src(paths.jssrc)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('js-copy', _ => {
  return gulp.src(paths.jssrc)
    .pipe(gulp.dest(paths.dst));
});

gulp.task('js-build', ['js-eslint', 'js-copy']);

gulp.task('watch', _ => {
  gulp.watch(paths.htmlsrc, ['html-build']);
  gulp.watch(paths.jssrc, ['js-build']);
  gulp.watch(paths.sasssrc, ['sass']);
  gulp.watch(paths.assetssrc, ['assets-copy']);
});

gulp.task('default', [
  'assets-copy',
  'html-build',
  'js-build',
  'sass',
  'watch'
]);

