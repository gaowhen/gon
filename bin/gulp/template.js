const gulp = require('gulp')
const replace = require('gulp-replace')

const config = require('../config').asset

module.exports = exports = function tpl() {
  return gulp.src([
    `${config.src.view}/**/*.pug`,
  ])
  .pipe(replace(global.REGEX, global.REG_BUILD))
  .pipe(gulp.dest(config.build.view))
}
