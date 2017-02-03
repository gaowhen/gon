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
      // hotUpdateChunkFilename: 'hot-update.js',
      // hotUpdateMainFilename: 'hot-update.json',
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
      // hotUpdateChunkFilename: 'hot-update.js',
      // hotUpdateMainFilename: 'hot-update.json',
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
      //   'webpack-hot-middleware/client':
      //   path.resolve(__dirname, '../node_modules/webpack-hot-middleware/client.js'),
      //   'react-hot-loader/patch':
      //   path.resolve(__dirname, '../node_modules/react-hot-loader/patch.js'),
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
                  // ['es2015', { modules: false }],
                  // 'react',
                  // 'stage-0',
                  [require.resolve('babel-preset-es2015'), { modules: false }],
                  require.resolve('babel-preset-react'),
                  require.resolve('babel-preset-stage-0'),
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
