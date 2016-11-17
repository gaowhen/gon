const gulp = require('gulp')
const rev = require('gulp-rev')

const config = require('../config').asset

module.exports = exports = function revision() {
  return gulp.src([
    `${config.build.path}/css/**/*.css`,
    `${config.build.path}/js/**/*.js`,
    `${config.build.path}/img/**/*.+(png|gif|jpg|eot|woff|ttf|svg|ico)`,
  ], {
    base: config.build.path,
  })
  .pipe(rev())
  .pipe(gulp.dest(config.dist.path))
  .pipe(rev.manifest())
  .pipe(gulp.dest(config.dist.asset))
}
