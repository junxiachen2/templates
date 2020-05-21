const path = require('path');
const webpack = require('webpack');
const { projectName, entry, template } = require('./entry');
const { resolve } = require('./resolve');
// 清理 dist 目录
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 提取 css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// css 压缩
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// js 压缩
const TerserPlugin = require('terser-webpack-plugin');

// 输出文件路径
const cwd = process.cwd();
// const outPutPath = path.resolve(cwd, `../../../../salam_app/static/${projectName}/`);
const outPutPath = path.resolve(cwd, `build`);
const NODE_MODULES = path.resolve(cwd, 'node_modules');
const NODE_ENV = process.env.NODE_ENV || 'production';
module.exports = {
  mode: 'production',
  entry,
  output: {
    path: outPutPath,
    // publicPath: `/static/${projectName}/`,
    publicPath: `./`,
    filename: 'assets/[name].[chunkhash:5].js'
  },
  resolve,
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
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          {
            // 用于配置「css-loader 作用于 @import 的资源之前」有多少个 loader
            loader: 'css-loader',
            options: {
              // 0 => 无 loader(默认); 1 => postcss-loader; 2 => postcss-loader, sass-loader
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
              limit: 3000,
              name: 'images/[name].[hash:5].[ext]'
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
              name: 'public/font/[name].min.[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // 删除历史构建文件
    new CleanWebpackPlugin(
      {
        dry: false,
        cleanOnceBeforeBuildPatterns: [outPutPath],
        dangerouslyAllowCleanPatternsOutsideProject: true
      }
    ),

    // js 内使用环境变量
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    }),

    // 提取css
    new MiniCssExtractPlugin({
      filename: 'assets/[name].[contenthash:5].css'
      // chunkFilename: '[name]/assets/[name].[chunkhash:5].chunk.css'
    }),
    new webpack.HashedModuleIdsPlugin(),

    // 模板
    ...template
  ],
  optimization: {
    minimize: true,
    minimizer: [
      // js 压缩
      new TerserPlugin({
        cache: true,
        parallel: true,
        extractComments: false
      }),
      // css 压缩
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          safe: true
        }
      })
    ]
  },
  stats: { children: false }
};

