const gulp = require('gulp')
// const cache = require('gulp-cached')
// const gulpif = require('gulp-if')

const config = require('../config').asset

module.exports = exports = function img() {
  return gulp.src(`${config.src.img}/**/*.+(png|gif|jpg|eot|woff|ttf|svg|ico)`)
    // 如果有同名文件，会因为缓存而不被上传
    // .pipe(gulpif(global.isDev, cache()))
    .pipe(gulp.dest(config.build.img))
}
