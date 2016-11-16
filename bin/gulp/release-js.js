const gulp = require('gulp')
const config = require('config').gulp
const uglify = require('gulp-uglify')

module.exports = exports = function uglified() {
  return gulp.src([
    `${config.dist.js}/**/*.js`,
    `!${config.dist.js}/lib/*.js`,
    `!${config.dist.js}/**/*.min.js`,
  ])
  .pipe(uglify({
    output: {
      ascii_only: true,
    },
    compress: {
      drop_console: true,
    },
  }))
  .pipe(gulp.dest(config.build.js))
}
