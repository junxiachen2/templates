import 'whatwg-fetch'
import Qs from 'qs'

const CREDS = 'include'
function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) { return response }
  const error = new Error(response.statusText)
  error.response = response
  throw error
}
const asyncFetch = async function (obj) {
  let url = obj.url
  let method = obj.method || 'GET'
  let credentials = obj.credentials || CREDS
  let body = obj.data || null
  let mode = 'cors';
  let headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    token: window.token
  }
  let confFetch = { headers, method, credentials, mode }
  if (method === 'GET' && body) { url = url + '?' + Qs.stringify(body) }
  else if (method === 'POST') { confFetch = { headers, method, credentials, mode, body: Qs.stringify(body) } }
  else if (method === 'UPLOAD') {
    method = 'POST';
    headers["Content-Type"] = 'multipart/form-data';
    confFetch = { headers, method, credentials, mode, body: body }
  }
  return new Promise(function (resolve, reject) {
    fetch(url, confFetch)
      .then(checkStatus)
      .then(res => res.json())
      .then(res => { resolve(res) })
      .catch(err => { reject(err) })
  })
}

export default asyncFetch

