const commonConfig = require('./webpack.common.config')
const webpackMerge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const process = require('process')
const webpack = require('webpack')

const nodeModuleDir = path.resolve(process.cwd(), 'node_module')
const appDir = path.resolve(process.cwd(), 'app')

const { routers, projectPath } = require('../router.json')

// const outputPath = path.resolve(process.cwd(), 'build')
const outputPath = path.resolve(process.cwd(), `../../../../salam_app/static/${projectPath}`)
const publicPath = `/static/${projectPath}`
const assestPathName = 'assest'

// HtmlWebpackPlugin 注入参数
const htmlPluginParamsObj = {
  dll: `<script src="https://oss.mashichat.com/front/dll/react.dll.js"></script>`,
  user: `<script type='text/javascript'>
    window.Token = '{{ token }}';
    window.Uid = '{{ uid }}';
    window.lang = '{{ lang }}';
    window.version = '{{ version }}';
  </script>`
}

const config = webpackMerge(commonConfig, {
  mode: 'production',
  output: {
    path: outputPath,
    publicPath,
    filename: `[name].[hash:5].js`
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          compress: { drop_console: true },
          output: { comments: false }
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    // runtimeChunk: { name: () => { return 'manifest' } },
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      cacheGroups: {
        default: {
          name: 'globals',
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        },
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        }
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({ __DEV__: 'false' }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: `${assestPathName}/[name].[chunkhash:5].css` })
    // new InlineManifestWebpackPlugin('manifest')
  ],
  module: {
    rules: [
      {
        test: new RegExp(`^(?!.*\\.common).*\\.css`),
        use: [MiniCssExtractPlugin.loader, {
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
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
        include: [appDir],
        exclude: [nodeModuleDir]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10,
            name: '[name].[hash:5].[ext]',
            outputPath: assestPathName,
            publicPath: `${publicPath}/${assestPathName}/`
          }
        }],
        include: [appDir],
        exclude: [nodeModuleDir]
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: assestPathName,
            publicPath: './'
          }
        }]
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
    filename: path.resolve(process.cwd(), `../../../../salam_app/templates/${projectPath}${tplName}.html`),
    template: tempSrc,
    inject: true,
    chunks: ['vendors', tplName],
    params: htmlPluginParamsObj
  })
  config.entry[tplName] = [path.resolve(appDir, `./router/${tplName}/index.js`)]
  config.plugins.splice(-1, 0, plugin)
})

module.exports = config
