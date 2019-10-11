const commonConfig = require('./webpack.common.config')
const webpackMerge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
const AssetsReplacePlugin = require('assets-replace-webpack-plugin')
const path = require('path')
const process = require('process')
const nodeModuleDir = path.resolve(process.cwd(), 'node_module')
const appDir = path.resolve(process.cwd(), 'app')
const outputPath = path.resolve(process.cwd(), '../../static/chat_admin/')
const assestPathName = 'assets'
const picturePrefix = 'https://static.qiushibaike.com/frontend/chat_admin/assets/images/'
const config = webpackMerge(commonConfig, {
  mode: 'production',
  output: {
    path: outputPath,
    chunkFilename: assestPathName + `/[name].[chunkhash:5].js`,
    publicPath: '',
    filename: assestPathName + `/[name].[chunkhash:5].js`
  },
  performance: {
    hints: false
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
    // runtimeChunk: { name: 'runtime' },
    splitChunks: {
      cacheGroups: {
        // 处理入口chunk
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          name: 'vendors',
          reuseExistingChunk: true,
          priority: 3
        },
        // 处理异步按需加载chunk
        'async-vendors': {
          test: /[\\/]node_modules[\\/]/,
          minChunks: 2,
          chunks: 'async',
          name: 'async-vendors',
          reuseExistingChunk: true,
          priority: 2
        }
      }
    }
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: assestPathName + `/[name].[chunkhash:5].css` }),
    // new HtmlWebpackPlugin({
    //   filename: `index.html`,
    //   title: '',
    //   template: path.join(appDir, 'index.html'),
    //   minify: {
    //     collapseWhitespace: true,
    //     conservativeCollapse: true
    //   },
    //   inject: true,
    //   chunks: ['runtime', 'vendors', 'default', 'app']
    // }),
    // new InlineManifestWebpackPlugin('runtime'),
    // new AssetsReplaceWebpackPlugin(path.resolve(__dirname, '../../../voice_admin/templates/chat.html'))
    new AssetsReplacePlugin([
      path.resolve(__dirname, '../../../../voice_admin/templates/chat.html')
    ])
  ],
  module: {
    rules: [
      {
        test: new RegExp(`^(?!.*\\.common).*\\.css`),
        use: ['style-loader', 'css-loader?modules', 'postcss-loader'],
        include: [appDir]
      },
      {
        test: new RegExp(`^(?!.*\\.common).*\\.css`),
        use: ['style-loader', 'css-loader', 'postcss-loader'],
        include: [/[\\/]node_modules[\\/].*antd/]
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
          options: {
            limit: 10,
            name: '[name].[hash:5].[ext]',
            outputPath: assestPathName + '/images/',
            publicPath: picturePrefix
          }
        }],
        include: [appDir],
        exclude: [nodeModuleDir]
      }
    ]
  }
})
module.exports = config
