/**
 * @description 对象深拷贝方法
 * @param {Object} v 需拷贝对象
 * @returns {Object} 拷贝结果
 */
const deepClone = (v) => {
  return JSON.parse(JSON.stringify(v))
}

// 将yy-mm-ss格式转换为时间戳
const formate = (date) => {
  return new Date(date).getTime()
}
const getFormatDate = () => {
  const date = new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
  const seperator = '-'
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  let nowDate = date.getDate()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (nowDate >= 0 && nowDate <= 9) {
    nowDate = '0' + nowDate
  }
  const newDate = year + seperator + month + seperator + nowDate
  return newDate
}
/**
 * @description 图片加载
 * @param {String} 图片url
 * @returns {Object} 图片信息
 */
const loadImage = url => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      resolve(img)
    }
    img.onerror = () => {
      reject('图片加载出错')
    }
    img.src = url
  })
}
const getLocalImageSize = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = e => {
      loadImage(e.target.result)
        .then(img => {
          resolve(img)
        })
        .catch(e => {
          reject(e)
        })
    }
  })
}
export {
  deepClone,
  formate,
  getFormatDate,
  loadImage,
  getLocalImageSize
}
