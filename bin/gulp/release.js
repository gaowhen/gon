const gulp = require('gulp')
const del = require('del')

const config = require('../config').asset

const img = require('./image')
const uglified = require('./release-js')
const revision = require('./release-rev')
const replaceStatic = require('./release-replace').replaceStatic
const replaceTpl = require('./release-replace').replaceTpl

const empty = del.bind(null, [config.dist.path, config.dist.view], { force: true })

function setEnv(done) {
  global.isDev = false
  done()
}

const rev = gulp.series(img, uglified, revision, (done) => done())
const replace = gulp.parallel(replaceStatic, replaceTpl, (done) => done())
const release = gulp.series(empty, setEnv, rev, replace, (done) => done())

module.exports = exports = release
