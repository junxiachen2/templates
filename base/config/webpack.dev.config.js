var path = require('path')
// var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var fs = require('fs')
var ip = require('ip')
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
  mode: 'development',
  entry: {},
  output: {
    path: path.resolve(__dirname, 'build'), // 所有输出文件的目标路径
    publicPath: '/', // 输出解析文件的目录，url 相对于 HTML 页面
    filename: 'js/[name].js', // 每个页面对应的主js的生成配置
    chunkFilename: 'js/[name].[chunkhash:5].chunk.js',
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
        // include: [path.resolve(__dirname, 'src')],  加了这一句会报错：不正确的loader
        exclude: [nodeModuleDir]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'url-loader', // file-loader
          options: {
            limit: 2500,
            name: 'images/[name].[ext]'
          }
        }],
        exclude: [nodeModuleDir]
      }
    ]
  },
  plugins: [],
  // 开发环境
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    // compress: true, // 是否开启gzip压缩
    port: '8888',
    host: ip.address(),
    historyApiFallback: true,
    // 请求代理
    proxy: {
      '/api': {
        target: '',
        secure: false
      }
    }
  }
}

views.map((page) => {
  const plugin = new HtmlWebpackPlugin({
    filename: `${page}.html`,
    chunks: [page],
    template: `./src/views/${page}.html`
  })
  webpackConfig.entry[page] = path.resolve(__dirname, `../src/js/${page}.js`)
  webpackConfig.plugins.push(
    plugin
  )
})

module.exports = webpackConfig;