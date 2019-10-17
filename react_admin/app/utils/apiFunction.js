import request from './asyncFetch'
import { message } from 'antd'
import api from '../config/api'
import Cookies from 'js-cookie'

const gen = (params) => {
  let url = params
  let method = 'GET'
  const paramsArray = params.split(' ')
  if (paramsArray.length === 2) {
    method = paramsArray[0]
    url = paramsArray[1]
  }

  return (data) => {
    return new Promise(function (resolve, reject) {
      request({ url, data, method })
        .then(res => {
          const { err, err_msg } = res
          if (err === 0) {
            resolve(res)
          }
          else if (err === 107) {
            Cookies.remove('token')
            window.location.reload()
          }
          else {
            message.error(err_msg)
            reject(err_msg)
          }
        })
        .catch(err => { reject(err) })
    })
  }
}

const APIFunction = {}
for (const key in api) {
  APIFunction[key] = gen(api[key])
}

export default APIFunction
