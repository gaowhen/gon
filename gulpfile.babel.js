const gulp = require('gulp')
const eslint = require('gulp-eslint')
const argv = require('yargs').argv

let files = argv.file && argv.file.split(' ')

if (!files || files.length === 0) {
  files = './**/*.js'
}

gulp.task('eslint', () =>
  gulp.src(files)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
)
