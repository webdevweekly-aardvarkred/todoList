const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const precss = require('precss')
const autoprefixer = require('autoprefixer')

const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 3000

module.exports = {
  entry: [
    path.join(__dirname, 'frontend', 'src', 'main.js')
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  plugins: [
    new ExtractTextPlugin('styles.css')
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
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader'),
        include: path.join(__dirname, 'frontend', 'src')
      }
    ]
  },
  postcss: function () {
    return [precss, autoprefixer]
  },
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  },
  port: port,
  host: host
}
