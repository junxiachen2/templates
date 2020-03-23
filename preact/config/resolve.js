const path = require('path');
module.exports = {
  resolve: {
    // 自动解析扩展后缀
    extensions: ['.js', '.jsx', '.css'],
    alias: {
      '@utils': path.resolve(__dirname, '../src/utils')
    },
    modules: [
      'node_modules',
      path.resolve(__dirname, '../src'),
      path.resolve(__dirname, '../node_modules')
    ]
  }
};
