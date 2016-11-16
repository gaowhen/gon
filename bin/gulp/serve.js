const nodemon = require('gulp-nodemon')

module.exports = exports = function serve(done) {
  nodemon({
    script: 'app.js',
    execMap: {
      js: 'node --harmony --inspect',
    },
    env: {
      NODE_ENV: 'development',
    },
  })
  done()
}

