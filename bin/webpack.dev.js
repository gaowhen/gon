const webpack = require('webpack')
const StringReplacePlugin = require('string-replace-webpack-plugin')

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
      'node_modules',
    ],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'react-hot-loader/webpack',
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
        exclude: /node_modules/,
      },
      {
        test: /\.styl$/,
        use: [
          {
            loader: 'style',
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
