const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

// vue识别
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const Autoprefixer = require('autoprefixer');

// 分离css代码 webpack4.0比较支持
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: './js/[name].[hash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, './src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        //include 表示哪些目录中的 .js 文件需要进行 babel-loader
        //exclude 表示哪些目录中的 .js 文件不要进行 babel-loader
        exclude: /node_modules/ 
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]', //打包后的图片名称
              publicPath: '../image/',
              outputPath: 'image',
              esModule: false,
            }
          }
        ]
      }
    ]
  },
  plugins: [
    Autoprefixer,
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, './index.html'),
      inject: true,
      hash: true,
      minify:{ //压缩HTML文件
        removeComments:true,    //移除HTML中的注释
        collapseWhitespace:true    //删除空白符与换行符
      }
    }),
    new VueLoaderPlugin()
  ]
}
