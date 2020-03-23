import 'whatwg-fetch';
import { compareVersion, isIOS } from '@utils/utils';
const CREDS = 'include';
const currentVersion = window.version.replace(/^\w+\_/, '');
const isHighVersion = compareVersion(currentVersion, '1.4.0') >= 0;

/**
 * 处理前端请求状态
 * @param {Object} response 后台返回的数据对象
 */
const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) { return response; }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};

/**
 * 走客户端请求代理
 * @param {object} args json参数对象
 * @param {string} callbackId 回调函数名
 * @returns {object} Promise 返回Promise对象
 */
export const fetchNative = (args, callbackId) => {
  if (!isHighVersion && args && args.requestMethod === 'POST') {
    if (isIOS) {
      args.params = JSON.stringify(args.params);
    }
  }

  return new Promise((resolve, reject) => {
    window[callbackId] = (data) => {
      const { err, err_msg } = data;
      if (err === 0) {
        resolve(data);
      }
      else {
        reject(err_msg);
      }
    };
    prompt('__native_call=>' + JSON.stringify({
      method: 'reqNative',
      module: 'proxy',
      action: 'request_proxy',
      callbackId,
      args
    }));
  });
};

/**
 * fetch-前端请求函数封装
 * @param {Object} opts 请求参数对象
 * @param {string} opts.url 请求url
 * @param {string} opts.method 请求类型, get || post
 * @param {string} opts.credentials 凭证
 * @param {object} opts.params 请求body体
 * @returns {object} Promise 返回Promise对象
 */
export const asyncFetch = (opts, isLogin = true) => {
  const url = opts.url;
  const method = opts.method || 'GET';
  const credentials = opts.credentials || CREDS;
  const body = opts.params || null;
  const mode = 'cors';
  const options = { method, credentials, mode };
  if (method === 'POST') {
    options['mode'] = mode;
    options['body'] = JSON.stringify(body);
  }
  if (isLogin) {
    const headers = {
      Token: window.Token,
      Uid: window.Uid
    };
    options['headers'] = headers;
  }
  return new Promise(function (resolve, reject) {
    fetch(url, options)
      .then(checkStatus)
      .then(res => res.json())
      .then(res => { resolve(res); })
      .catch(err => { reject(err); });
  });
};
