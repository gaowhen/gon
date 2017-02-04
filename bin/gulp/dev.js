const gulp = require('gulp')

const serve = require('./serve')
const watch = require('./watch')

const dev = gulp.parallel(serve, watch)

module.exports = exports = dev

