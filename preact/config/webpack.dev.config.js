const path = require('path');
const webpack = require('webpack');
const { entry, template } = require('./entry');
const { resolve } = require('./resolve');

// copy 目录
const CopyPlugin = require('copy-webpack-plugin');

// 清理dist 目录
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 把从内存中dist文件输出目录dist
const WriteFilePlugin = require('write-file-webpack-plugin');

// node 命令运行的目录
const cwd = process.cwd();
// 输出文件路径
const outPutPath = path.join(cwd, 'dist');
const NODE_MODULES = path.join(cwd, 'node_modules');
const NODE_ENV = process.env.NODE_ENV || 'development';
module.exports = {
  mode: 'development',
  entry,
  resolve,
  output: {
    path: outPutPath,
    publicPath: '/',
    filename: 'static/[name]/[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        include: [path.resolve(__dirname, '../src')],
        exclude: [NODE_MODULES, /(.|_)min\.js$/],
        use: ['babel-loader']
      },
      // {
      //   test: /\.html$/,
      //   include: [path.resolve(__dirname, '../src')],
      //   loader: 'html-loader'
      // },
      {
        test: /\.(le|sa|sc|c)ss$/,
        include: [path.resolve(__dirname, '../src')],
        // loader 从下往上执行 less-loader => postcss-loader => css-loader => style-loader || MiniCssExtractPlugin.loader
        use: [
          {
            loader: 'style-loader'
          },
          {
            // 用于配置「css-loader 作用于 @import 的资源之前」有多少个 loader
            loader: 'css-loader',
            options: {
              // modules: {
              //   localIdentName: '[local]_[hash:base64:5]'
              // },
              // 0 => 无 loader(默认) 1 => postcss-loader 2 => postcss-loader, sass-loader
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        test: /\.(bmp|png|jpe?g|gif)$/,
        exclude: [NODE_MODULES],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1000,
              name: 'static/images/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'static/public/font/[name].min.[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),

    // js 内使用环境变量
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    }),

    // 开启热更新
    new webpack.HotModuleReplacementPlugin(),

    // 把webpack 编译在内存中dist文件,输出目录
    new WriteFilePlugin(),

    ...template,

    // copy图片
    new CopyPlugin([
      {
        from: path.resolve(cwd, 'src/pages/weekstar/assets/images'),
        to: 'static/images/'
      }
    ])
  ],
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    compress: true,
    port: 9091,
    hot: true,
    host: '0.0.0.0',
    proxy: {
      // http://47.91.110.239:17001 测试1环境
      // http://47.91.110.239:17002 测试2环境
      '/api/*': {
        target: 'http://api-test1.mashichat.com',
        pathRewrite: { '^/api': '' },
        changeOrigin: true
      }
    }
  },
  devtool: 'source-map',
  stats: { children: false }
};
