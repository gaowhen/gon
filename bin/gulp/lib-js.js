const gulp = require('gulp')
const include = require('gulp-include')

const config = require('../config').asset

module.exports = exports = function libjs() {
  return gulp.src([
    `${config.src.js}/lib/**/*.js`,
  ])
  .pipe(include())
  .on('error', console.error)
  .pipe(gulp.dest(`${config.build.path}/lib`))
}
