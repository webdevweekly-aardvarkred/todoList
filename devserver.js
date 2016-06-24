const path = require('path')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config')

new WebpackDevServer(webpack(config), {
  contentBase: path.join(__dirname, 'dist'),
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(config.port, config.host, function (err, result) {
  if (err) {
    return console.log(err)
  }

  console.log(`Listening at http://${config.host}:${config.port}/`)
})