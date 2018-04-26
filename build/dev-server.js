var config = require('../config')
var webpackMiddleware=require('webpack-dev-middleware-hard-disk')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')

var compiler = webpack(webpackConfig)

var devMiddleware = webpackMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  noInfo:false,
  quiet: false,
  stats: {
    colors: true
  }
})
devMiddleware.waitUntilValid(function(){
    console.log('Package is in a valid state');
  });


var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})
