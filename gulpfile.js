'use strict';
var gulp = require('gulp');
var htmlhint = require("gulp-htmlhint");
var del = require('del');

var paths = {
  src: 'src', dst: 'dist',
  htmlsrc: ['src/*.html', 'src/**/*.html'],
  htmldst: ['dist/*.html', 'dist/**/*.html']
};

gulp.task('html-hint', _ => {
  return gulp.src(paths.htmlsrc)
    .pipe(htmlhint())
    .pipe(htmlhint.reporter());
});

gulp.task('html-clean', _ => {
  return del(paths.htmldst);
});

gulp.task('html-copy', _ => {
  return gulp.src(paths.htmlsrc)
    .pipe(gulp.dest(paths.dst));
});

gulp.task('html-build', ['html-clean', 'html-hint', 'html-copy']);

gulp.task('watch', _ => {
  gulp.watch(paths.htmlsrc, ['html-build']);
});

gulp.task('default', ['html-build', 'watch']);

