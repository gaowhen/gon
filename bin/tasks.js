const path = require('path')
const fs = require('fs')

require('shelljs/global')

const CWD = process.cwd()

const proxy = require('./proxy')

function isNPMInstalled() {
  const modulePath = path.resolve(CWD, 'node_modules')

  if (!fs.existsSync(modulePath)) {
    console.log('installing dependencies…\n')
    exec('npm install')
  }
}

module.exports = {
  init(appname) {
    if (!appname || !appname.length) {
      console.log('APP name is required')
      process.exit()
    }

    cp('-R', path.resolve(__dirname, '../scaffolding'), path.resolve(CWD, appname))
    console.log('APP:', appname, 'is created.')
  },
  start(port) {
    isNPMInstalled()
    proxy.start(port)
  },
}
