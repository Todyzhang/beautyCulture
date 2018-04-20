let path = require('path');
let utils = require('./utils');
let config = require('../config');
let vueLoaderConfig = require('./vue-loader.conf');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let resolve = function (dir) {
  return path.join(__dirname, '..', dir);
};
let entries = utils.getEntries(resolve("src") + '/pages/**/main.js');
let pages = utils.getEntries(resolve("src") + '/pages/**/index.html', 1);

module.exports = {
  entry: entries,
  output: {
    path: config.build.assetsRoot,// 指定打包之后的文件夹
    filename: 'js/[name].js',// 指定打包为一个文件
    // 指定资源文件引用的目录
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.webdev.assetsPublicPath
  },
  externals: {
    'mui': 'window.mui'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
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
        from: resolve('static/lib'),
        to: config.build.assetsRoot + '/mui/'
      },
      // copy custom manifest
      {
        from: resolve('src/manifest.json'),
        to: config.build.assetsRoot,
        ignore: ['.*']
      }
    ]),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: resolve("index.html"),
      inject: false
    })
  ]
}

for (let pathname in pages) {
  // 生成html相关配置
  let conf = {
    filename: pathname + '.html', // html文件输出路径
    template: pages[pathname],   // 模板路径
    inject: true,                // js插入位置
    minify: {
      // 压缩设置
      // removeComments: true,
      // collapseWhitespace: true,
      // removeAttributeQuotes: true
      // more options:
      // https://github.com/kangax/html-minifier#options-quick-reference
    },
    // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    chunksSortMode: 'dependency'
  };
  pathname = pathname.split('/')[1];//  去掉views
  if (pathname in module.exports.entry) {
    conf.inject = 'body';
    //  如果每个html没有进入这里的话，那么全部js将会插入html
    conf.chunks = [pathname];
    conf.hash = true;
  }
  module.exports.plugins.push(new HtmlWebpackPlugin(conf));
}
