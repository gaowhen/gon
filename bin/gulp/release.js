const gulp = require('gulp')
const del = require('del')

const config = require('../config').asset

const img = require('./image')
const uglified = require('./release-js')
const revision = require('./release-rev')
const replaceStatic = require('./release-replace').replaceStatic
const replaceTpl = require('./release-replace').replaceTpl

function empty() {
  return del([config.dist.path, config.dist.view], { force: true })
}

function setEnv(done) {
  global.isDev = false
  done()
}

const rev = gulp.series(gulp.parallel(img, uglified), revision)
const replace = gulp.parallel(replaceStatic, replaceTpl)
const release = gulp.series(gulp.parallel(empty, setEnv), rev, replace)

module.exports = exports = release
