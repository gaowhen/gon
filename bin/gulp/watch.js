const gulp = require('gulp')
const del = require('del')

const config = require('../config').asset

const image = require('./image')
const template = require('./template')

function empty() {
  return del([config.build.path, config.build.view], { force: true })
}

function imgWatch(done) {
  gulp.watch(`${config.src.img}/**/*.+(png|gif|jpg|eot|woff|ttf|svg|ico)`, image)
  done()
}

const img = gulp.series(image, imgWatch)

function tplWatch(done) {
  gulp.watch(`${config.src.view}/**/*.pug`, template)
  done()
}

const tpl = gulp.series(template, tplWatch)

const parallel = gulp.parallel(img, tpl)

const watch = gulp.series(empty, parallel)

module.exports = exports = watch
