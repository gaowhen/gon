const gulp = require('gulp')
const rev = require('gulp-rev')

const config = require('../config').asset

module.exports = exports = function revision() {
  return gulp.src([
    `${config.build.path}/**/*.css`,
    `${config.build.path}/**/*.js`,
    `${config.build.path}/**/*.+(png|gif|jpg|eot|woff|ttf|svg|ico)`,
  ], {
    base: config.build.path,
  })
  .pipe(rev())
  .pipe(gulp.dest(config.dist.path))
  .pipe(rev.manifest())
  .pipe(gulp.dest(config.path))
}
