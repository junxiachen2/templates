const ip = require('ip')

module.exports = {
  ip: ip.address(),
  port: 8888,
  assetsRelace: false,
  outputPath: 'build/',
  assestsPath: './'
  // outputPath: '../../statics/activityWeb/activityDistribute1v1/',
  // assestPath: 'https://static.app-remix.com/activityWeb/activityDistribute1v1/'
}
