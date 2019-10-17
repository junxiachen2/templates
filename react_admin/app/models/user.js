import Cookies from 'js-cookie'
import APIFunction from '../utils/apiFunction'

class User {
  constructor () {
    this.token = Cookies.get('token')
    window.token = this.token
  }

  /**
   * @description 校验用户token状态
   */
  checkStatus () {
    return this.token ? this.token : false
  }

  /**
   * @description 登录
   */
  async login (option, cb) {
    if (!option.login || !option.password) return
    const res = await APIFunction.login(option)
    const { token } = res.data
    Cookies.set('token', token)
    window.token = token
    cb && cb()
  }

  /**
   * @description 退出登录
   */
  async logout (cb) {
    await APIFunction.logout()
    Cookies.remove('token')
    cb && cb()
  }
}

export default User
