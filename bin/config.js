const path = require('path')

function getPath(folder) {
  const cwd = process.env.INIT_CWD || process.cwd()
  return path.resolve(cwd, folder)
}

const defaultConfig = {
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
    // webpack externals
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
  },
}

/* eslint-disable */
const customConfig = require(`${path.resolve(process.cwd(), 'config.js')}`)
const extended = Object.assign({}, defaultConfig, customConfig || {})
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
  dev: extended.dev,
}

Object.keys(config.asset).map((key) => {
  Object.keys(config.asset[key]).map((subKey) => {
    config.asset[key][subKey] = getPath(config.asset[key][subKey])

    return subKey
  })

  return key
})

module.exports = config
