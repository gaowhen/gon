const gulp = require('gulp')
// const del = require('del')

const uglified = require('./release-js')
const revision = require('./release-rev')
const replaceStatic = require('./release-replace').replaceStatic
const replaceTpl = require('./release-replace').replaceTpl

// const empty = del.bind(null, [config.dist.asset, config.dist.view])

function setEnv(done) {
  global.isDev = false
  global.MANIFEST = '../static/rev-manifest.json'
  done()
}

const rev = gulp.series(uglified, revision, (done) => done())
const replace = gulp.parallel(replaceStatic, replaceTpl, (done) => done())
const release = gulp.series(setEnv, rev, replace, (done) => done())

module.exports = exports = release
