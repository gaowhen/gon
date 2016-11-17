const path = require('path')
const webpack = require('webpack')
const StringReplacePlugin = require('string-replace-webpack-plugin')

const CWD = process.cwd()

const config = require('./webpack.common')

const PATH = config.PATH

module.exports = {
  devtool: '#inline-source-map',
  cache: true,
  context: __dirname,
  entry: config.getEntries(PATH.entries),
  output: {
    path: PATH.entries.build,
    filename: '[name].js',
    publicPath: PATH.publicPath,
  },
  resolve: {
    modules: [
      PATH.root,
      path.resolve(CWD, 'node_modules'),
    ],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: path.join(__dirname, '../node_modules/react-hot-loader/webpack'),
          },
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: './tmp/',
            },
          },
          StringReplacePlugin.replace({
            replacements: [
              {
                pattern: /\{\{\{(\S*?)\}\}\}/g,
                replacement(match, p1) {
                  return `/static/build/${p1}`
                },
              },
            ],
          }),
        ],
        exclude: path.resolve(CWD, 'node_modules'),
      },
      {
        test: /\.styl$/,
        use: [
          {
            loader: path.join(__dirname, '../node_modules/style-loader'),
          },
          {
            loader: 'css?sourceMap',
          },
          StringReplacePlugin.replace({
            replacements: [
              {
                pattern: /\{\{\{(\S*?)\}\}\}/g,
                // TODO 配置域名
                replacement: (match, p1) => `http://piaofang.wepiao.com/static/build/${p1}`,
              },
            ],
          }),
          {
            loader: 'stylus?sourceMap',
          },
        ],
      },
    ],
  },
  plugins: [
    new StringReplacePlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    echarts: 'echarts',
  },
}
