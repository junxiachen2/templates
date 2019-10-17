import React, { Component } from 'react'
import style from './topHeader.css'
import { Layout, Icon, Modal } from 'antd'
import User from '../../models/user'
// import APIFunction from '../../services/index'

const { confirm } = Modal
const { Header } = Layout

class TopHeader extends Component {
  user = new User()

  logout () {
    this.user.logout(() => {
      this.user = null
      window.location.reload()
    })
  }

  logoutModal () {
    confirm({
      title: '确定要退出登录吗？',
      onOk () {
        this.logout()
      },
      onCancel () {
        console.log('Cancel')
      }
    })
  }

  render () {
    const { loginInfo = {}} = this.props
    return (
      <Header className={style.header}>
        <div className={style.logo} />
        <div className={style.headerText}>公会管理后台</div>
        <div className={style.right}>
          <div className={style.rightItem}>用户名：{loginInfo.login}</div>
          <div className={style.logout} onClick={this.logoutModal}>
            <Icon className={style.icon} type="poweroff" />
            退出
          </div>
        </div>
      </Header>
    )
  }
}

export default TopHeader
