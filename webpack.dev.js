const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: '../dist',
    port: 8085,
    hot: true, // 开启配置
    stats: 'minimal',
    compress: true, // 代码压缩
    proxy: {
      '/api': {
        target: 'http://10.45.31.88/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        }
      }
    }
  }
});
