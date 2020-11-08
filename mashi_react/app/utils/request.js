import { isDev } from './env'
// import 'whatwg-fetch'
import qs from 'qs'

const request = (args) => {
  if (isDev) {
    const testToken = 'IgnoreEncrypt=561aff628d3c1dae8305d00ef0687eaf&IgnoreSign=561aff628d3c1dae8305d00ef0687eaf'
    let body
    let { url } = args
    if (args.method === 'POST') {
      body = JSON.stringify(args.params)
      url = `${url}?${testToken}`
    }
    else {
      url = `${url}${url.indexOf('?') >= 0 ? '&' : '?'}${testToken}&${qs.stringify(args.params)}`
    }

    return new Promise((resolve, reject) => {
      fetch(url, {
        method: args.method || 'GET',
        headers: new Headers({
          Token: window.Token,
          Uid: window.Uid,
          Lang: window.lang,
          'Content-Type': 'application/json'
        }),
        body
      }).then((res) => res.json())
        .then((res) => resolve(res))
        .catch((error) => reject(error))
    })
  }
  const callbackId = `nativeFetchCallback${new Date().getTime()}`
  return new Promise((resolve, reject) => {
    window[callbackId] = (res) => {
      console.log(res)

      resolve(res)
    }
    const { url, method, params } = args
    prompt(`__native_call=>${JSON.stringify({
      method: 'reqNative',
      module: 'proxy',
      action: 'request_proxy',
      callbackId,
      args: {
        url,
        requestMethod: method || 'GET',
        params
      }
    })}`)
  })
}

export default request
