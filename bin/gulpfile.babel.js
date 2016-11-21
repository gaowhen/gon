const gulp = require('gulp')

const dev = require('./gulp/dev')
const lint = require('./gulp/eslint')
const release = require('./gulp/release')

global.isDev = true
global.REGEX = /\{\{\{(\S*?)\}\}\}/g
global.REG_BUILD = '/static/build/$1'
global.REG_DIST = '/static/dist/$1'
global.DIST_DIR = '/static/dist/'

gulp.task('default', dev, (done) => done())
gulp.task('eslint', lint)
gulp.task('release', release)
