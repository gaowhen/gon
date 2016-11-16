const path = require('path')
const glob = require('globby')

const PATH = {
  root: path.join(__dirname, 'src/static/'),
  publicPath: '/static/build/',
  entries: {
    pattern: [
      './src/static/**/*.js',
      './src/static/js/common.js',
      '!./src/static/**/_*.js',
      '!./src/static/js/lib/**/*.js',
    ],
    build: path.join(__dirname, 'static/build/'),
  },
}

function getEntries(config) {
  const map = {}
  const hotMiddlewareScript =
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true'

  const fileList = glob.sync(config.pattern)

  const entryMap = fileList.reduce((prev, cur) => {
    const name = path.basename(cur, path.extname(cur))
    const newPrev = prev
    if (process.env.NODE_ENV === 'production') {
      newPrev[name] = cur
    } else {
      newPrev[name] = ['react-hot-loader/patch', hotMiddlewareScript, cur]
    }

    return newPrev
  }, map)

  return entryMap
}

module.exports = {
  PATH,
  getEntries,
}
