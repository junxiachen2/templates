const adaptive = require('postcss-adaptive')
module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-cssnext'),
    require('precss'),
    require('cssnano'),
    adaptive({
      remUnit: 37.5,
      autoRem: true,
      remPrecision: 2
    })
  ]
}
