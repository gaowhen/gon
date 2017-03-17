const path = require('path')
const webpack = require('webpack')
const StringReplacePlugin = require('string-replace-webpack-plugin')

const config = require('./webpack.common')
const gonConfig = require('./config').dev

const domain = gonConfig.domain
const externals = gonConfig.externals

const PATH = config.PATH
const CWD = process.cwd()

module.exports = [
  {
    name: 'lib',
    entry: PATH.lib,
    output: {
      path: PATH.entries.build,
      filename: 'lib.js',
      publicPath: PATH.publicPath,
    },
    performance: {
      hints: false,
    },
  },
  {
    name: 'app',
    devtool: '#cheap-eval-source-map',
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
    },
    // Tell webpack what directories should be searched when resolving loaders.
    resolveLoader: {
      modules: [path.resolve(__dirname, '../node_modules')],
    },
    module: {
      // http://stackoverflow.com/questions/29883534/webpack-node-modules-css-index-js-didnt-return-a-function
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
                  [require.resolve('babel-preset-env'), { modules: false }],
                  require.resolve('babel-preset-react'),
                ],
                plugins: [
                  [
                    require.resolve('babel-plugin-import'), {
                      libraryName: 'antd',
                    },
                  ],
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
              loader: 'css-loader?sourceMap',
            },
            StringReplacePlugin.replace({
              replacements: [
                {
                  pattern: /\{\{\{(\S*?)\}\}\}/g,
                  replacement: (match, p1) => `http://${domain}/static/build/${p1}`,
                },
              ],
            }),
            {
              loader: 'stylus-loader?sourceMap',
            },
          ],
        },
      ],
    },
    plugins: [
      new StringReplacePlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development'),
        },
      }),
    ],
    externals,
    performance: {
      hints: false,
    },
  },
]
