const gulp = require('gulp')
const config = require('config').gulp
const del = require('del')

const libjs = require('./lib-js')
const img = require('./image')
const tpl = require('./template')

const empty = del.bind(null, [config.build.asset, config.build.view])

gulp.task('libjs', gulp.series(libjs, (done) => {
  gulp.watch(`${config.src.js}/lib/**/*.js`, libjs)
  done()
}))

gulp.task('img', gulp.series(img, (done) => {
  gulp.watch(`${config.src.img}/**/*.+(png|gif|jpg|eot|woff|ttf|svg|ico)`, img)
  done()
}))

gulp.task('tpl', gulp.series(tpl, (done) => {
  gulp.watch(`${config.src.view}/**/*.pug`, tpl)
  done()
}))

const parallel = gulp.parallel('libjs', 'img', 'tpl', (done) => done())

const watch = gulp.series(empty, parallel, (done) => done())

module.exports = exports = watch
