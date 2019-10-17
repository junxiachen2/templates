import React, { Component } from 'react'
import { render } from 'react-dom'
import App from './views/app'
import Login from './views/login/login'
import User from './models/user'
import { LocaleProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import moment from 'moment'
import './common/app.common.css'

moment.locale('zh-cn')

class Main extends Component {
  user = new User()
  render () {
    if (this.user.checkStatus()) {
      return <App />
    }
    return <Login />
  }
}

window.onload = function () {
  render(
    <LocaleProvider locale={zh_CN}>
      <Main />
    </LocaleProvider>
    , document.getElementById('main'))
}
