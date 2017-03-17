const path = require('path')

const webpack = require('webpack')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
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
                  [require.resolve('babel-preset-env'), { modules: false }],
                  require.resolve('babel-preset-react'),
                ],
              },
            },
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.styl$/,
          use: ExtractTextPlugin.extract({
            use: [
              'css-loader',
              'stylus-loader',
            ],
          }),
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
      // new BundleAnalyzerPlugin({
      //   analyzerMode: 'static',
      // }),
    ],
    externals: gonConfig.dev.externals,
  },
]
