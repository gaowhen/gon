const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const config = require('./webpack.common')

const PATH = config.PATH

module.exports = {
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
      'node_modules',
    ],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: './tmp/',
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
            loader: 'css',
          },
          {
            loader: 'stylus',
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
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    echarts: 'echarts',
  },
}
