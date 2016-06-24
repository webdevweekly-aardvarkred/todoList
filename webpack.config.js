var path = require('path')
var webpack = require('webpack')

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
    path: path.join(__dirname, 'dist', 'js'),
    filename: 'bundle.js',
    publicPath: '/assets/js/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'frontend', 'src')
    }]
  },
  port: port,
  host: host
}
