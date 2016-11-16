/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

const gulp = require('gulp')
const include = require('gulp-include')
const config = require('config').gulp

module.exports = exports = function libjs() {
  return gulp.src([
    `${config.src.js}/lib/**/*.js`,
  ])
  .pipe(include())
  .on('error', console.error)
  .pipe(gulp.dest(`${config.build.js}/lib`))
}
