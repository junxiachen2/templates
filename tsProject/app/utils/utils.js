/**
 * 根据浏览器userAgent 判断平台
 */
export const inBrowser = typeof window !== 'undefined'
export const UA = inBrowser && window.navigator.userAgent.toLowerCase()
export const isAndroid = (UA && UA.indexOf('android') > 0)
export const isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA))
/**
 * 获取浏览器userAgent, 判断是否在app内打开页面
 * @returns {boolean} true => 在app中的webview打开, false => 在浏览器打开
 */
export const isInMashiApp = UA.includes('app=mashi')
/**
 *
 * @param {*} data 传入时间戳,ms
 * @returns {object} 时间戳转换的日时分秒对象
 */
export const formatDateTime = function (data) {
  const days = parseInt((data / (1000 * 60 * 60 * 24)))
  const hours = parseInt((data % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) < 10 ? ('0' + parseInt((data % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))) : parseInt((data % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = parseInt((data % (1000 * 60 * 60)) / (1000 * 60)) < 10 ? ('0' + parseInt((data % (1000 * 60 * 60)) / (1000 * 60))) : parseInt((data % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = parseInt(data % (1000 * 60) / 1000) < 10 ? ('0' + parseInt(data % (1000 * 60) / 1000)) : parseInt(data % (1000 * 60) / 1000)
  return { days: days, hours: hours, minutes: minutes, seconds: seconds }
}
// 获取url参数
export const getQueryString = function () {
  const qs = (location.search.length > 0 ? location.search.substring(1) : '')
  const items = qs.length ? qs.split('&') : []
  const args = {}
  for (let i = 0; i < items.length; i++) {
    const item = items[i].split('=')
    const name_1 = decodeURIComponent(item[0])
    const value = decodeURIComponent(item[1])
    if (name_1.length) {
      args[name_1] = value
    }
  }
  return args
}
/**
  * 版本号比较
  * @param {String} v1 版本号1
  * @param {String} v2 版本号2
  * @returns  1:v2小  0:相等  -1:v2大
  */
export const compareVersion = function (v1, v2) {
  v1 = v1.split('.')
  v2 = v2.split('.')
  const len = Math.max(v1.length, v2.length)
  while (v1.length < len) {
    v1.push('0')
  }
  while (v2.length < len) {
    v2.push('0')
  }
  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i])
    const num2 = parseInt(v2[i])
    if (num1 > num2) {
      return 1
    }
    else if (num1 < num2) {
      return -1
    }
  }
  return 0
}
// 加载单张图片
export const loadImage = function (url) {
  return new Promise(function (resolve, reject) {
    const img = new Image()
    img.onload = function () {
      // console.log('图片加载完毕')
      resolve()
    }
    img.onerror = function () {
      reject('\u56FE\u7247\u52A0\u8F7D\u51FA\u9519 ' + url)
    }
    img.src = url
  })
}
// 加载多张图片
export const preLoadImages = function (urlArr) {
  return new Promise(function (resolve, reject) {
    Promise.all(urlArr.map(function (url) {
      return loadImage(url)
    }))
      .then(function () {
        // console.log('所有图片加载完毕')
        resolve()
      })
      .catch(function (e) {
        reject(e)
      })
  })
}
// 根据设备版本转换webp图片
// ios && version>=1.8.0 支持 webp
export const transformWebp = function (url) {
  if (!url) return
  const ver = window.version.split('_')[1]
  if (isInMashiApp && isIOS && compareVersion('1.8.0', ver)) {
    return url.replace('image/format,webp', 'image/format,png')
  }
  else if (isInMashiApp && isIOS) {
    return url.replace('https', 'mashiwebp').replace('image/format,png', 'image/format,webp')
  }
  return url
}
