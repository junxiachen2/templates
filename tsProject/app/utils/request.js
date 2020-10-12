import { isDev } from './env'
// import 'whatwg-fetch'
import qs from 'qs'
const request = function (args) {
  if (isDev) {
    const testToken = 'IgnoreEncrypt=561aff628d3c1dae8305d00ef0687eaf&IgnoreSign=561aff628d3c1dae8305d00ef0687eaf'
    let body
    let url = args.url
    if (args.method === 'POST') {
      body = JSON.stringify(args.params)
      url = url + '?' + testToken
    }
    else {
      url = '' + url + (url.indexOf('?') >= 0 ? '&' : '?') + testToken + '&' + qs.stringify(args.params)
    }
    return new Promise(function (resolve, reject) {
      fetch(url, {
        method: args.method || 'GET',
        headers: new Headers({
          Token: window.Token,
          Uid: window.Uid,
          Lang: window.lang,
          'Content-Type': 'application/json'
        }),
        body: body
      }).then(function (res) { return res.json() })
        .then(function (res) { return resolve(res) })
        .catch(function (error) { return reject(error) })
    })
  }
  const callbackId = 'nativeFetchCallback' + new Date().getTime()
  return new Promise(function (resolve, reject) {
    window[callbackId] = function (res) {
      console.log(res)
      resolve(res)
    }
    const url = args.url
    const method = args.method
    const params = args.params
    prompt('__native_call=>' + JSON.stringify({
      method: 'reqNative',
      module: 'proxy',
      action: 'request_proxy',
      callbackId: callbackId,
      args: {
        url: url,
        requestMethod: method || 'GET',
        params: params
      }
    }))
  })
}
export default request
