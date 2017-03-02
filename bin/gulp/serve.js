const path = require('path')
const nodemon = require('gulp-nodemon')

const config = require('../config').dev

module.exports = exports = function serve(done) {
  const script = path.join(`${process.env.INIT_CWD}`, 'app.js')

  nodemon({
    script,
    restartable: 'rs',
    execMap: {
      js: 'node --harmony --inspect',
    },
    ignore: [
      '.git',
      'node_modules/**/node_modules',
      'static',
      'src',
      'view',
    ],
    watch: [`${process.env.INIT_CWD}`],
    events: {
      restart: "osascript -e 'display notification \"App restarted due to:\n'$FILENAME'\" with title \"nodemon\"'",
    },
    env: config.env,
  })
  done()
}

