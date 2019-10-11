import React, { Component } from 'react'
import style from './login.css'
import User from '../../models/user'
import { Form, Icon, Input, Button } from 'antd'
import { message } from 'antd'

class Login extends Component {
  preLogin () {
    const { getFieldDecorator, validateFields } = this.props.form
    validateFields((errors, values) => {
      if (!errors) {
        const { username, password } = values
        const option = { login: username, password }
        if (!username || !password) {
          message.error('请填写账号和密码')
          return
        }
        const user = new User()
        user.login(option, () => {
          window.location.reload()
        })
      }
    })
  }

  render () {
    const { getFieldDecorator, validateFields } = this.props.form

    return (
      <div className={style.wrap}>
        <div className={style.loginBox}>
          <div className={style.loginBoxTop}>
            <div className={style.loginBoxTopImg}></div>
            <div className={style.loginBoxText}>公会管理后台</div>
          </div>
          <Form onSubmit={this.preLogin.bind(this)} className={style.form}>
            <Form.Item>
              {getFieldDecorator('username', {
                getValueFromEvent: (event) => {
                  return event.target.value.trim()
                }
              })(
                <Input
                  className={style.input}
                  autoFocus={true}
                  autoComplete="off"
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="输入您的账号"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                getValueFromEvent: (event) => {
                  return event.target.value.trim()
                }
              })(
                <Input
                  className={style.input}
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="输入您的密码"
                />,
              )}
            </Form.Item>
            <Button htmlType="submit" className={style.loginBtn}>
              登陆
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

const WrappedLogin = Form.create({ name: 'login_form' })(Login)
export default WrappedLogin

