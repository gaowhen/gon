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
      js: getPath('static/build/js'),
      css: getPath('static/build/css'),
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
  domain: 'piaofang.wepiao.com',
  dev: {
    fe: {
      local: '127.0.0.1:8000',
      dev: '127.0.0.1:8000',
      pre: '127.0.0.1:8000',
      pro: '127.0.0.1:8000',
    },
    be: {
      dev: '127.0.0.1:8000',
      pre: '127.0.0.1:8000',
      pro: '127.0.0.1:8000',
    },
    f2e: '127.0.0.1:8000',
    api: '127.0.0.1:8000',
    react: '0',
  },
}
