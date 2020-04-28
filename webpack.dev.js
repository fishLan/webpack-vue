const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  module:{
    rules:[{
      test: /\.css$/,
      loader: ['style-loader', 'css-loader','postcss-loader']
    },
    {
      test: /\.less$/,
      loader: ['style-loader', 'css-loader', 'postcss-loader','less-loader',{
        loader: 'style-resources-loader',
        options: {
          patterns: path.resolve(__dirname, './src/css/var.less'),
        }
      }]
    }],
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: '../dist',
    port: 8085,
    hot: true, // 开启配置
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
