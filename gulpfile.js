'use strict';
var gulp = require('gulp');
var htmlhint = require("gulp-htmlhint");
var paths = {
  src: ['src/*.html', 'src/**/*.html']
};

gulp.task('htmlhint', _ => {
  return gulp.src(paths.src)
      .pipe(htmlhint())
      .pipe(htmlhint.reporter());
});

gulp.task('watch', _ => {
  gulp.watch(paths.src, ['htmlhint']);
});

gulp.task('default', ['htmlhint', 'watch']);

