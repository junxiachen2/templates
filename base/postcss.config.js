const autoprefixer = require('autoprefixer')
const adaptive = require('postcss-adaptive')
module.exports = {
  plugins: [
    autoprefixer(),
    adaptive({ remUnit: 37.5, autoRem: true })
  ]
}
