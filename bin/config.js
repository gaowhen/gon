const path = require('path')

function getPath(folder) {
  const cwd = process.env.INIT_CWD || process.cwd()
  return path.resolve(cwd, folder)
}

const defaultConfig = {
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
    domain: 'piaofang.wepiao.com',
    f2e: '127.0.0.1:8000',
    api: '127.0.0.1:80',
    port: 8000,
    fe: {
      local: '127.0.0.1:8000',
      dev: '0:80',
      pre: '0:80',
      pro: '0:80',
    },
    be: {
      dev: '127.0.0.1:80',
      pre: '0:80',
      pro: '0:80',
    },
    react: '0',
    proxy: {
      '/data/sk/101010100.html': 'www.weather.com.cn:80',
      '2pmh9.free.natapp.cc': '/ping',
    },
  },
}

/* eslint-disable */
const customConfig = require(`${path.resolve(process.cwd(), 'config.js')}`)
const extended = Object.assign({}, defaultConfig, customConfig)
const config = {
  asset: {
    path: getPath(extended.asset.path),
    origin: extended.asset.path,
  },
  dev: extended.dev
}

Object.keys(extended.asset).map((key) => {
  if (key !== 'path' || key !== 'origin') {
    Object.keys(extended.asset[key]).map((subKey) => {
      if (!config.asset[key]) {
        config.asset[key] = {}
      }

      config.asset[key][subKey] = getPath(extended.asset[key][subKey])

      // webpack needs this original path
      if (key === 'build' && subKey === 'path') {
        config.asset[key].origin = extended.asset[key][subKey]
      }

      return subKey
    })
  }

  return key
})

module.exports = config
