const gulp = require('gulp')
const replace = require('gulp-replace')

const config = require('../config').asset

function replaceFunc(match, p1) {
  /* eslint-disable */
  const manifest = require(`${config.path}/rev-manifest.json`)
  /* eslint-disable */

  return global.DIST_DIR + manifest[p1]
}

function replaceStatic() {
  return gulp.src([
    `${config.dist.path}/**/*.css`,
    `${config.dist.path}/**/*.js`,
  ], {
    base: config.dist.path,
  })
  .pipe(replace(global.REGEX, replaceFunc))
  .pipe(gulp.dest(config.dist.path))
}

function replaceTpl() {
  return gulp.src([
    `${config.src.view}/**/*.pug`,
  ])
  .pipe(replace(global.REGEX, replaceFunc))
  .pipe(gulp.dest(config.dist.view))
}

module.exports = exports = {
  replaceStatic,
  replaceTpl,
}
