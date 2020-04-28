一个简单的webpack
1.npm -v 创建package.json
2. npm install webpack webpack-cli --save-dev  安装webpack
3. package.json  新增 private：true，删除main字段入口
4. 新建webpack.config.js
module.exports = {
  entry: './src/main.js',   //入口文件
  output: {
    filename: './js/[name].[hash].bundle.js',  //，输出的地址(这里是dist下的js文件夹)以及文件的名称（new HtmlWebpackPlugin后会自动引入打包的js和css）
    path: path.resolve(__dirname, 'dist')
  }
};

5.html 模板（dist里面根据index.html 生产新的页面）
new HtmlWebpackPlugin({
    filename: 'index.html',
    template: path.resolve(__dirname, './index.html'), //必须的要，不会有问题指定模板地址
    inject: true,
}) 

6.修改script : {
    "build": "webpack"
}


二。逐渐丰富
0.优化文件的引入方式
  resolve: {
    alias: {
      '@': path.join(__dirname, './src'),
    }
  }



js处理
1.安装 npm install -D babel-loader @babel/core @babel/preset-env
{
    test: /\.js$/,
    loader: 'babel-loader',
    //include 表示哪些目录中的 .js 文件需要进行 babel-loader
    //exclude 表示哪些目录中的 .js 文件不要进行 babel-loader
    exclude: /node_modules/ 
}
创建.babelrc文件。。。。。


处理css
1.安装 ：npm install --save-dev style-loader css-loader
{
    test: /\.css$/,
    loader: ['style-loader', 'css-loader']
}

less处理
1.安装  npm install less-loader --save-dev
less 使用的load  ['style-loader','css-loader','less-loader'] 顺序不能随意改变，加载顺序是从最后一个开始
如果使用了less变量，那么要用的‘style-resources-loader’,指向变量的文件，否则less变量会找不到
use: [
            'css-loader',
            'less-loader',
            {
              loader: 'style-resources-loader',
              options: {
                patterns: path.resolve(__dirname, './src/css/var.less'),
              }
            }
          ]

图片处理
1.安装 npm install --save-dev file-loader
//或者安装url-loader  url-load可以处理大小转base64
{
    test: /\.(png|svg|jpg|gif)$/,
    use: [
        {
        loader: 'file-loader',
        options: {
            name: '[name].[ext]', //打包后的图片名称
            publicPath: '../image/',   
            outputPath: 'image', //图片输出的路径,这里表示打包到image文件夹下
            esModule: false,
        }
        }
    ]
}

vue文件识别(如果不安装回报页面标签识别不了)
安装：npm isntall vue-loader
{
    test: /\.vue$/,
    oader: 'vue-loader',
}

三。压缩打包(压缩打包应该是在webpack.prod.js中，引入const merge = require('webpack-merge')，然后module.exports = merge(common, 。。。)
model为production时自带的了js的压缩，但是如果使用optimize-css-assets-webpack-plugin 对css 压缩时，原有的js压缩会失效，所以必须重新对css进行压缩，而且压缩的顺序应该是在css压缩的后面
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
在webpack.prod.js中

 optimization: {
    minimizer: [
      // 压缩css
      new OptimizeCSSAssetsPlugin(),
      // 压缩js
      new UglifyJsPlugin({
        cache: true, // 是否用缓存
        parallel: true, // 并发打包
        // sourceMap: false, // es6 -> es5 转换时会用到
      })
    ]
  },

  使用CleanWebpackPlugin 清楚上次打包


中途遇到的问题
1.vue 文件中的less 样式识别不了，使用的loader 顺序必须正确，如果没有style-load将无法识别页面的内 的style-less

3.img图片地址 （img标签内的图片显示不了更改pubilic的地址，到指定的对应图片路径下）
4.postcss-loader autoprefixer没有生效，以及报错：Replace Autoprefixer browsers option to Browserslist config. Use browserslist key in package.json or .browserslistrc file.  原因  版本不对
5.压缩css时js压缩失效了：在css压缩后重新压缩
6. babel-load使用  npm install -D babel-loader @babel/core @babel/preset-env
7  webpack4.0中使用“extract-text-webpack-plugin”之后，生产环境下报错，主要原因是这个包在4.0时候不建议使用，如果要使用应该安装
npm install -D extract-text-webpack-plugin@next，4.0推荐使用  mini-css-extract-plugin
8.打包后css 样式和js 样式在一起，导致的不显示蛇者allChunks 为true可解决
    new ExtractTextPlugin({
      filename: './css/[name]-buddle.css',
      allChunks: true,  
    })
9.开发环境的热更新直接可在package.json中设置--hot 
10。CleanWebpackPlugin is not a constructor
解决办法const { CleanWebpackPlugin } = require('clean-webpack-plugin');
11.生产中的生产中的sourcemap 模式
webpack 在构建中提供了不少于7种的sourcemap模式，其中eval模式虽然可以提高构建效率，但是构建后的脚本较大，因此生产上并不适用。而source-map 模式可以通过生成的 .map 文件来追踪脚本文件的 具体位置，进而缩小脚本文件的体积，这是生产模式的首选，并且在生产中，我们需要隐藏具体的脚本信息，因此可以使用 cheap 和module 模式来达到目的。
综上，在生产的webpack devtool选项中，我们使用 cheap-module-source-map的配置
