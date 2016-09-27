'use strict';
const gulp = require('gulp');
const htmlhint = require("gulp-htmlhint");
const eslint = require('gulp-eslint');

var paths = {
  src: 'src', dst: 'dist',
  htmlsrc: ['src/*.html', 'src/**/*.html'],
  htmldst: ['dist/*.html', 'dist/**/*.html'],
  jssrc: ['src/*.js', 'src/**/*.js'],
  jsdst: ['dist/*.js', 'dist/**/*.js']
};

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
});

gulp.task('default', ['html-build', 'js-build', 'watch']);

