const gulp = require('gulp')
const stylus = require('gulp-stylus')
const config = require('config').gulp
const sourcemaps = require('gulp-sourcemaps')
const gulpif = require('gulp-if')
const cssnano = require('gulp-cssnano')
const replace = require('gulp-replace')
const jeet = require('jeet')
const nib = require('nib')
const autoprefixer = require('gulp-autoprefixer')

module.exports = exports = function css() {
  return gulp.src([
    `${config.src.css}/**/*.styl`,
    `!${config.src.css}/**/_*.styl`,
  ])
  .pipe(gulpif(global.isDev, sourcemaps.init()))
  .pipe(stylus({
    use: [nib(), jeet()],
    // compress: true,
    'include css': true,
  }))
  .pipe(autoprefixer({
    remove: false,
    browsers: [
      '> 1%',
      'ff >= 20',
      'ie >= 10',
      'last 5 iOS versions',
    ],
  }))
  // https://github.com/ben-eb/gulp-cssnano/issues/8
  .pipe(gulpif(global.isDev, replace(global.REGEX, global.REG_BUILD), cssnano({ zindex: false })))
  .pipe(gulpif(global.isDev, sourcemaps.write('./map')))
  .pipe(gulp.dest(config.build.css))
}

