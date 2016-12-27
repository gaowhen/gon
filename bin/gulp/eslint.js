'use strict'

const gulp = require('gulp')
const eslint = require('gulp-eslint')
const argv = require('yargs').argv

const config = require('../config').asset

let files = argv.file && argv.file.split(' ')

if (!files || files.length === 0) {
  files = `${config.src.js}/**/*.js`
}

module.exports = exports = function lint() {
  return gulp.src(files)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
}
