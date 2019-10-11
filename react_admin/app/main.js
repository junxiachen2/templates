import React from 'react'
import { render } from 'react-dom'
import App from './views/app'
import Login from './views/login/login'
import User from './models/user'
import { LocaleProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import moment from 'moment'
import './common/app.common.css'

moment.locale('zh-cn')

const main = () => {
  const user = new User()
  if (user.checkStatus()) {
    return <App />
  }
  return <Login />
}

window.onload = function () {
  render(
    <LocaleProvider locale={zh_CN}>
      {main()}
    </LocaleProvider>
    , document.getElementById('main'))
}
