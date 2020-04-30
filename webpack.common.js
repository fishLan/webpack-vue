const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

// vue识别
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const Autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isDEV = process.env.NODE_ENV !== 'production'

console.log('isDEV :>> ', isDEV);


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
    },
    extensions: ['.js', '.json', '.vue', '.jsx']
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
      },
      {
        test: /\.(le|c)ss$/,
        use: [
          isDEV ? 'style-loader' :  MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.join(__dirname, './postcss.config.js')
              }
            }
          },
          {
            loader: 'style-resources-loader',
            options: {
              patterns: path.resolve(__dirname, './src/css/var.less'),
            }
          }
        ]
      }
    ]
  },
  plugins: [
    Autoprefixer,
    new VueLoaderPlugin(),
    
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
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: './css/[name].[hash].css',
      chunkFilename: './css/[id].[hash].css',
    })
  ]
}
