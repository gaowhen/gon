const path = require('path')

function getPath(folder) {
  const cwd = process.env.INIT_CWD || process.cwd()
  return path.resolve(cwd, folder)
}

module.exports = {
  asset: {
    path: getPath('static/'),
    src: {
      path: getPath('src/'),
      js: getPath('src/static/js'),
      img: getPath('src/static/img'),
      view: getPath('src/template'),
    },
    build: {
      path: getPath('static/build'),
      img: getPath('static/build/img'),
      view: getPath('view/build/'),
    },
    dist: {
      path: getPath('static/dist'),
      js: getPath('static/dist/js'),
      css: getPath('static/dist/css'),
      img: getPath('static/dist/img'),
      view: getPath('view/dist/'),
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
      '/test': 'baidu.com:80:/aaa',
      'free.natapp.cc': '/ping',
    },
  },
}
