const path = require('path')
const process = require('process')
const webpack = require('webpack')
module.exports = {
  mode: 'production',
  entry: {
    react: ['react', 'react-dom', 'react-intl-universal']
  },
  output: {
    filename: '[name].dll.js',
    path: path.resolve(process.cwd(), 'dll'),
    library: '[name]_dll'
  },
  plugins: [
    new webpack.DllPlugin({
      // 动态链接库的全局变量名称，需要和 output.library 中保持一致
      name: '[name]_dll',
      // 描述动态链接库的 manifest.json 文件输出时的文件名称
      path: path.resolve(process.cwd(), 'dll', '[name].dll.manifest.json')
    })
  ]
}
