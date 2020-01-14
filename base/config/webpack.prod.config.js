var path = require('path');
// var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
var UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
var fs = require('fs')
var nodeModuleDir = path.resolve(process.cwd(), 'node_module')
var views = [] // 所有HTML文件

// 遍历读取views目录下的所有HTML文件
fs.readdirSync('./src/views').forEach((filename) => {
  const extname = path.extname(filename)// 后缀
  const basename = path.basename(filename, extname) // 文件名
  if (extname === '.html') {
    views.push(basename)
  }
})

var webpackConfig = {
  mode: 'production',
  entry: {},
  output: {
    path: path.resolve(__dirname, '../build'), // 所有输出文件的目标路径
    publicPath: './', // 输出解析文件的目录，url 相对于 HTML 页面
    filename: 'js/[name].js', // 每个页面对应的主js的生成配置
    chunkFilename: 'js/[name].[chunkhash:5].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        include: [path.resolve(__dirname, 'src')],
        exclude: [nodeModuleDir]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
        exclude: [nodeModuleDir]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'url-loader', // file-loader
          options: {
            limit: 2500,
            outputPath: '/images',
            publicPath: '../images',
            name: '[name].[ext]'
          }
        }],
        exclude: [nodeModuleDir]
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            // 删除所有的注释
            comments: false
          },
          // 在UglifyJs删除没有用到的代码时不输出警告
          warnings: false,
          compress: {
            // 删除所有的 `console` 语句
            // 还可以兼容ie浏览器
            drop_console: true
          }
        }
      })
    ],
    runtimeChunk: { name: () => { return 'manifest' } },
    splitChunks: {
      cacheGroups: {
        globals: {
          minChunks: 2,
          name: 'globals',
          priority: -20,
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    })
  ]
}

views.map((page) => {
  const plugin = new HtmlWebpackPlugin({
    filename: `${page}.html`,
    chunks: ['manifest', 'globals', page],
    template: `./src/views/${page}.html`
  })
  webpackConfig.entry[page] = path.resolve(__dirname, `../src/js/${page}.js`)
  webpackConfig.plugins.push(
    plugin
  )
})

module.exports = webpackConfig;
