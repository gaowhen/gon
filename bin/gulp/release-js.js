const gulp = require('gulp')
const uglify = require('gulp-uglify')

const config = require('../config').asset

module.exports = exports = function uglified() {
  return gulp.src([
    `${config.build.path}/**/*.js`,
    `!${config.build.path}/lib/*.js`,
    `!${config.build.path}/**/*.min.js`,
  ])
  .pipe(uglify({
    output: {
      ascii_only: true,
    },
    compress: {
      drop_console: true,
    },
  }))
  .pipe(gulp.dest(config.build.path))
}
