const gulp = require('gulp')
const config = require('config').gulp
const cache = require('gulp-cached')
const gulpif = require('gulp-if')

module.exports = exports = function img() {
  return gulp.src(`${config.src.img}/**/*.+(png|gif|jpg|eot|woff|ttf|svg|ico)`)
    .pipe(gulpif(global.isDev, cache()))
    .pipe(gulp.dest(config.build.img))
}
