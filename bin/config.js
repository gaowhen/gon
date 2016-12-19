const path = require('path')
const fs = require('fs')

function getPath(folder) {
  const cwd = process.env.INIT_CWD || process.cwd()
  return path.resolve(cwd, folder)
}

// function extend(obj, ...args) {
//   const target = Object.assign({}, obj)

//   ;[].forEach.call([].slice.call(args, 0), (source) => {
//     if (source) {
//       Object.keys(source).map((prop) => {
//         if ({}.hasOwnProperty.call(source, prop)) {
//           target[prop] = source[prop]
//         }

//         return prop
//       })
//     }
//   })

//   return target
// }

/* eslint-disable */
let custom = {}

if (fs.existsSync(path.resolve(process.cwd(), '.config.js'))) {
  custom = require(`${path.resolve(process.cwd(), '.config.js')}`)
} else if (fs.existsSync(path.resolve(process.cwd(), 'config.js'))) {
  custom = require(`${path.resolve(process.cwd(), 'config.js')}`)
}
/* eslint-enable */

const config = {
  asset: {
    path: 'static/',
    src: {
      path: 'src/',
      js: 'src/static/js',
      img: 'src/static/img',
      view: 'src/template',
    },
    build: {
      path: 'static/build',
      img: 'static/build/img',
      view: 'view/build/',
    },
    dist: {
      path: 'static/dist',
      js: 'static/dist/js',
      css: 'static/dist/css',
      img: 'static/dist/img',
      view: 'view/dist/',
    },
  },
  dev: {
    domain: custom.domain || 'gon.com',
    f2e: (custom.fe && custom.fe.local) || '127.0.0.1:8000',
    api: (custom.be && custom.be.dev) || '127.0.0.1:80',
    react: 'minified',
    port: custom.port || 8000,
    fe: {
      local: (custom.fe && custom.fe.local) || '127.0.0.1:8000',
      dev: (custom.fe && custom.fe.dev) || '',
      pre: (custom.fe && custom.fe.pre) || '',
      pro: (custom.fe && custom.fe.pro) || '',
    },
    be: {
      dev: (custom.be && custom.be.dev) || '127.0.0.1:80',
      pre: (custom.be && custom.be.pre) || '',
      pro: (custom.be && custom.be.dev) || '',
    },
    proxy: custom.proxy || {
      '/data/sk/101010100.html': 'www.weather.com.cn:80',
      '2pmh9.free.natapp.cc': '/ping',
    },
    // webpack externals
    externals: custom.externals || {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
  },
}

Object.keys(config.asset).map((key) => {
  if (key === 'path') {
    config.asset[key] = getPath(config.asset[key])

    return key
  }

  Object.keys(config.asset[key]).map((subKey) => {
    config.asset[key][subKey] = getPath(config.asset[key][subKey])

    return subKey
  })

  return key
})

module.exports = config
