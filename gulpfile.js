var gulp = require('gulp');
var sass = require('gulp-sass');
var flatten = require('gulp-flatten');

const scssGlobs = [
  './public/*.scss',
  './modules/*/*.scss'
];

gulp.task('sass', function() {
  gulp
  .src(scssGlobs)
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(flatten())
  .pipe(gulp.dest('./public/css'));
});

gulp.task('default', ['sass'], function() {
  gulp.watch(scssGlobs, ['sass']);
})