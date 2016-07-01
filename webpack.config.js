const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 3000

module.exports = {
  devtool: 'eval',
  entry: [
    `webpack-dev-server/client?http://${host}:${port}`,
    'webpack/hot/only-dev-server',
    path.join(__dirname, 'frontend', 'src', 'main.js')
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'frontend', 'src')
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
        include: path.join(__dirname, 'frontend', 'src')
      }
    ]
  },
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  },
  port: port,
  host: host
}
