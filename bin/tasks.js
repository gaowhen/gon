const path = require('path')
const fs = require('fs')
const notifier = require('node-notifier')

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

const gulp = path.join(__dirname, '../node_modules/.bin/gulp')
const gulpfile = path.join(__dirname, 'gulpfile.babel.js')

const webpack = path.join(__dirname, '../node_modules/.bin/webpack')
const webpackConfig = path.join(__dirname, 'webpack.pro.js')

exec('npm view Gon version', (error, remoteVersion) => {
  exec('Gon -v', (error, localVersion) => {
    if (remoteVersion.replace(/./g, '') > localVersion.replace(/./g, '')) {
      notifier.notify({
        title: 'Gon',
        message: `New version available: ${remoteVersion} `,
        open: 'http://npmjs.com/package/Gon',
        contentImage: path.resolve(__dirname, '../doc/logo.png'),
      })
    }
  })
})

module.exports = {
  create(appname) {
    if (!appname || !appname.length) {
      console.log('APP name is required')
      process.exit()
    }

    cp('-R', path.resolve(__dirname, '../scaffolding'), path.resolve(CWD, appname))
    exec(`cd ${path.resolve(CWD, appname)} && git init`)
    console.log('Project:', appname, 'is created.')
  },
  dev(port) {
    isNPMInstalled()
    proxy.start(port)
  },
  release() {
    isNPMInstalled()
    process.env.NODE_ENV = 'production'
    console.log('Releasing…')
    exec(`NODE_ENV=production ${webpack} -p --config ${webpackConfig} --color=true --verbose=false --hide-modules=true && ${gulp} --color --gulpfile ${gulpfile} release`)
  },
}
