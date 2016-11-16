const gulp = require('gulp')

const serve = require('./serve')
const watch = require('./watch')

const dev = gulp.parallel(serve, watch, (done) => done())

module.exports = exports = dev

