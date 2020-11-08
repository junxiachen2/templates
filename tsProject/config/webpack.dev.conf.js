const commonConfig = require('./webpack.common.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackMerge = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')
const process = require('process')

const nodeModuleDir = path.resolve(process.cwd(), 'node_module')
const appDir = path.resolve(process.cwd(), 'app')
const ip = require('ip')
const port = 9998
const host = ip.address()

const { routers } = require('../router.json')

// HtmlWebpackPlugin 注入参数
const htmlPluginParamsObj = {
  dll: `<script src="https://oss.mashichat.com/front/dll/react.dll.js"></script>`,
  user: `<script type='text/javascript'>
    window.Token = '088f5665594c8f153f0723c4d465e0e9';
    window.Uid = '126255053905854465';
    window.lang = 'en';
    window.version = 'ios_1.6.0';
  </script>`
}

const config = webpackMerge(commonConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    compress: true,
    port,
    host,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://api-test2.mashichat.com',
        pathRewrite: { '^/api': '' },
        changeOrigin: true
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({ __DEV__: 'true' }),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: new RegExp(`^(?!.*\\.common).*\\.css`),
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[local]--[hash:base64:5]'
              }
            }
          }, 'postcss-loader'],
        include: [appDir],
        exclude: [nodeModuleDir]
      },
      {
        test: new RegExp(`^(.*\\.common).*\\.css`),
        use: ['style-loader', 'css-loader', 'postcss-loader'],
        include: [appDir],
        exclude: [nodeModuleDir]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: { limit: 2500 }
        }],
        include: [appDir],
        exclude: [nodeModuleDir]
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: ['file-loader']
      }
    ]
  }
})
routers.map((item) => {
  const {
    tplName
  } = item
  const tempSrc = path.resolve(appDir, `./router/${tplName}/index.html`)
  const plugin = new HtmlWebpackPlugin({
    filename: `${tplName}.html`,
    template: tempSrc,
    inject: true,
    chunks: [tplName],
    params: htmlPluginParamsObj
  })
  config.entry[tplName] = [path.resolve(appDir, `./router/${tplName}/index.tsx`)]
  config.plugins.push(plugin)
})

module.exports = config
