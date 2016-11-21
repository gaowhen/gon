const path = require('path')
const webpack = require('webpack')
const StringReplacePlugin = require('string-replace-webpack-plugin')

const config = require('./webpack.common')

const PATH = config.PATH
const CWD = process.cwd()

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
    // Tell webpack what directories should be searched when resolving modules.
    modules: [
      PATH.root,
      path.resolve(CWD, 'node_modules'),
      path.resolve(__dirname, '../node_modules'),
    ],
    // or webpack cannot resolve these modules
    // These aliasing is used when trying to resolve a module
    // alias: {
    //   'webpack-hot-middleware/client': path.resolve(__dirname, '../node_modules/webpack-hot-middleware/client.js'),
    //   'react-hot-loader/patch': path.resolve(__dirname, '../node_modules/react-hot-loader/patch.js'),
    //   'ansi-html': path.resolve(__dirname, '../node_modules/ansi-html/'),
    //   'html-entities': path.resolve(__dirname, '../node_modules/html-entities/'),
    //   'react-proxy': path.resolve(__dirname, '../node_modules/react-proxy/'),
    //   global: path.resolve(__dirname, '../node_modules/global/'),
    // },
  },
  // Tell webpack what directories should be searched when resolving loaders.
  resolveLoader: {
    modules: [path.resolve(__dirname, '../node_modules')],
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
              cacheDirectory: path.resolve(__dirname, 'tmp/'),
              presets: [
                // ['es2015', { modules: false }],
                // 'react',
                // 'stage-0',
                [require.resolve('babel-preset-es2015'), { modules: false }],
                require.resolve('babel-preset-react'),
                require.resolve('babel-preset-stage-0'),
              ],
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
            loader: 'style-loader',
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
