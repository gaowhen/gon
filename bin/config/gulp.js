const path = require('path')

const src = {
  path: path.resolve(__dirname, '../src/static'),
  js: path.resolve(__dirname, '../src/static/js'),
  css: path.resolve(__dirname, '../src/static/css'),
  img: path.resolve(__dirname, '../src/static/img'),
  precommit: path.resolve(__dirname, '../pre-commit'),
  commitmsg: path.resolve(__dirname, '../commit-msg'),
  git: path.resolve(__dirname, '../.git'),
  view: path.resolve(__dirname, '../src/template'),
  pkg: path.resolve(__dirname, '../package.json'),
}

const build = {
  asset: path.resolve(__dirname, '../static'),
  path: path.resolve(__dirname, '../static/build'),
  js: path.resolve(__dirname, '../static/build'),
  css: path.resolve(__dirname, '../static/build'),
  img: path.resolve(__dirname, '../static/build/img'),
  view: path.resolve(__dirname, '../view'),
  pkg: path.resolve(__dirname, '../'),
  webpack: path.resolve(__dirname, '../static/build/webpack'),
}

const dist = {
  asset: path.resolve(__dirname, '../static'),
  path: path.resolve(__dirname, '../static/dist'),
  js: path.resolve(__dirname, '../static/dist'),
  css: path.resolve(__dirname, '../static/dist'),
  img: path.resolve(__dirname, '../static/dist/img'),
  view: path.resolve(__dirname, '../view'),
  pkg: path.resolve(__dirname, '../'),
}

const release = {
  path: path.resolve(__dirname, '../release'),
  asset: path.resolve(__dirname, '../release/static'),
}

const config = {
  src,
  build,
  dist,
  release,
}

module.exports = config
