const https = require('https')
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

https.get('https://raw.githubusercontent.com/gaowhen/gon/master/package.json', (res) => {
  let body = ''

  res.on('data', (chunk) => {
    body += chunk
  })

  res.on('end', () => {
    try {
      const rv = JSON.parse(body).version

      fs.readFile(path.resolve(__dirname, '../package.json'), 'utf-8', (err, pkg) => {
        try {
          const lv = JSON.parse(pkg).version

          if (rv.replace(/\./g, '') > lv.replace(/\./g, '')) {
            notifier.notify({
              title: 'Gon',
              message: `New version available: ${rv} `,
              open: 'http://npmjs.com/package/Gon',
              contentImage: path.resolve(__dirname, '../doc/logo.png'),
            })
          }
        } catch (err) {
          console.log(err)
        }
      })
    } catch (err) {
      console.log(err)
    }
  })
})

// exec('npm view Gon version', (error, remoteVersion) => {
//   exec('Gon -v', (error, localVersion) => {
//     if (remoteVersion.replace(/\./g, '') > localVersion.replace(/\./g, '')) {
//       notifier.notify({
//         title: 'Gon',
//         message: `New version available: ${remoteVersion} `,
//         open: 'http://npmjs.com/package/Gon',
//         contentImage: path.resolve(__dirname, '../doc/logo.png'),
//       })
//     }
//   })
// })

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
