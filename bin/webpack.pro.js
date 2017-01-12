const path = require('path')

const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const config = require('./webpack.common')
const gonConfig = require('./config')

const PATH = config.PATH
const CWD = process.cwd()

module.exports = [
  {
    name: 'lib',
    entry: PATH.libMin,
    output: {
      path: PATH.entries.build,
      filename: 'lib.min.js',
      publicPath: PATH.publicPath,
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
    ],
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
  },
  {
    context: __dirname,
    entry: config.getEntries(PATH.entries),
    output: {
      path: PATH.entries.build,
      filename: '[name].js',
      publicPath: '/static/dist/js',
    },
    resolve: {
      modules: [
        PATH.root,
        path.resolve(CWD, 'node_modules'),
        path.resolve(__dirname, '../node_modules'),
      ],
    },
    resolveLoader: {
      modules: [path.resolve(__dirname, '../node_modules')],
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  [require.resolve('babel-preset-es2015'), { modules: false }],
                  require.resolve('babel-preset-react'),
                  require.resolve('babel-preset-stage-0'),
                ],
              },
            },
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.styl$/,
          use: [
            ExtractTextPlugin.extract(''),
            {
              loader: 'css-loader',
            },
            {
              loader: 'stylus-loader',
            },
          ],
        },
      ],
    },
    plugins: [
      new ExtractTextPlugin('[name].css'),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
      }),
    ],
    externals: gonConfig.dev.externals,
  },
]
