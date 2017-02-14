const path = require('path')
const glob = require('globby')

const CWD = process.cwd()

const PATH = {
  root: path.resolve(CWD, 'src/static/'),
  publicPath: '/static/build/',
  entries: {
    pattern: [
      path.resolve(CWD, 'src/static/**/*.js'),
      path.resolve(CWD, 'src/static/js/common.js'),
      `!${path.resolve(CWD, 'src/static/**/_*.js')}`,
      `!${path.resolve(CWD, 'src/static/js/lib/**/*.js')}`,
    ],
    build: path.resolve(CWD, 'static/build/'),
  },
  lib: path.resolve(CWD, 'src/static/js/lib/lib.js'),
  libMin: path.resolve(CWD, 'src/static/js/lib/lib.min.js'),
}

const gonConfig = require('./config').dev

function getEntries(config) {
  const map = {}
  // webpack.dev.js LN 27 name 需要
  // 和 hot middleware uri name 参数一致
  // https://github.com/glenjamin/webpack-hot-middleware/blob/master/client.js#L154
  const hotMiddlewareScript =
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true&name=app'

  const fileList = glob.sync(config.pattern)

  const entryMap = fileList.reduce((prev, cur) => {
    const name = path.basename(cur, path.extname(cur))
    const newPrev = prev
    if (process.env.NODE_ENV === 'production' || !gonConfig.enableHMR) {
      newPrev[name] = cur
    } else {
      newPrev[name] = ['react-hot-loader/patch.js', hotMiddlewareScript, cur]
    }

    return newPrev
  }, map)

  return entryMap
}

module.exports = {
  PATH,
  getEntries,
}
