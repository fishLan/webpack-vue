const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

//webpack在model等于production下已经对js进行了压缩
//使用optimize-css-assets-webpack-plugin对js进行压缩时，必须重写UglifyJsPlugin，否则会报错，除此之外使用了babel-loaer应该要加.babelrc文件
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
//清除上次打包的内容
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

//c从js拆分css
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(common, {
  // 优化项
  optimization: {
    minimizer: [
      // 压缩css
      new OptimizeCSSAssetsPlugin(),
      // 压缩js
      new UglifyJsPlugin({
        uglifyOptions: {
          ie8: false,
          ecma: 8,
          mangle: true,
          compress: {
            drop_console: true,
            side_effects: false,
            reduce_vars: true // 把使用多次的静态值自动定义为变量
          },
          output: {
            comments: false,
            beautify: false
          }
        },
        parallel: true,
        cache: true
      }),
    ]
  },
  devtool: 'cheap-module-source-map',
  //图片压缩
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            //压缩图片要在file-loader之后使用
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
  ]
})
