var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CleanPlugin = require('clean-webpack-plugin')
var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = utils.getRealPath('../');
var entries = utils.getEntry('./src/pages/**/main.js') // 获得入口js文件

var env = process.env.NODE_ENV
  // check env & config/index.js to decide weither to enable CSS Sourcemaps for the
  // various preprocessor loaders added to vue-loader at the end of this file
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd

module.exports = {
  entry: entries,
  output: {
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [utils.getRealPath('../node_modules')],
    alias: {
      'vue$': 'vue/dist/vue',
      'src': utils.getRealPath('../src'),
      'imgs': utils.getRealPath('../static/imgs'),
      'common': utils.getRealPath('../src/common'),
      'components': utils.getRealPath('../src/components')
    }
  },
  externals: {
    'mui': 'window.mui'
  },
  resolveLoader: {
    fallback: [utils.getRealPath('../node_modules')]
  },
  module: {
    loaders: [{
      test: /\.vue$/,
      loader: 'vue'
    }, {
      test: /\.js$/,
      loader: 'babel',
      include: projectRoot,
      exclude: /node_modules/
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url',
      query: {
        limit: 10000,
        name: utils.assetsPath('img/[name].[hash:7].[ext]')
      }
    },{
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url',
      query: {
        limit: 10000,
        name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
      }
    }]
  },
  vue: {
    loaders: utils.cssLoaders({
      sourceMap: useCssSourceMap
    }),
    postcss: [
      require('autoprefixer')({
        browsers: ["iOS >= 7","Android >= 4"]
      })
    ]
  },
  plugins: [
    //清空生成目录
    new CleanPlugin(
      ['dist'],　 //匹配删除的文件
      {
        root: utils.getRealPath('../'),       　　　　　　　　　　//根目录
        verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
        dry:      false,        　　　　　　　　　　//启用删除文件
        exclude:['.project'], //不删除文件
        allowExternal:true
      }
    ),
    /*
      from    定义要拷贝的源目录           from: __dirname + ‘/src/public’
      to      定义要拷贝到的目标目录     from: __dirname + ‘/dist’
      toType  file 或者 dir         可选，默认是文件
      force   强制覆盖先前的插件           可选 默认false
      context                         可选 默认base context可用specific context
      flatten 只拷贝文件不管文件夹      默认是false
      ignore  忽略拷贝指定的文件           可以用模糊匹配
     */
    new CopyWebpackPlugin([
      {
        from: utils.getRealPath('../src/manifest.json'),
        to: config.build.assetsRoot,
        force:true
      }
    ]),
    new CopyWebpackPlugin([
      {
        from:utils.getRealPath("../static/mui"),
        to:config.build.assetsRoot+"/mui",
        force:true,
        toType:"dir"
      }
    ]),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: utils.getRealPath("../index.html"),
      inject: false
    })
  ]
};


