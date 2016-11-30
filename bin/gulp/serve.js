const path = require('path')
const nodemon = require('gulp-nodemon')

const config = require('../config').dev

module.exports = exports = function serve(done) {
  const script = path.join(`${process.env.INIT_CWD}`, 'app.js')

  nodemon({
    script,
    execMap: {
      js: 'node --harmony --inspect',
    },
    env: {
      NODE_ENV: 'development',
      NODE_PORT: config.port,
    },
  })
  done()
}

