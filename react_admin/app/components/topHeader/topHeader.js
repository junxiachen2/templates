import React from 'react'
import style from './topHeader.css'
import { Layout, Icon, Modal } from 'antd'
import User from '../../models/user'
// import APIFunction from '../../services/index'

const { confirm } = Modal
const { Header } = Layout

function TopHeader (props) {
  let user = new User()
  const { loginInfo } = props
  const logout = () => {
    user.logout(() => {
      window.location.reload()
      user = null
    })
  }

  const logoutModal = () => {
    confirm({
      title: '确定要退出登录吗？',
      onOk () {
        logout()
      },
      onCancel () {
        console.log('Cancel')
      }
    })
  }

  return (
    <Header className={style.header}>
      <div className={style.logo} />
      <div className={style.headerText}>公会管理后台</div>
      <div className={style.right}>
        <div className={style.rightItem}>用户名：{loginInfo.login}</div>
        <div className={style.logout} onClick={logoutModal}>
          <Icon className={style.icon} type="poweroff" />
          退出
        </div>
      </div>
    </Header>
  )
}

export default TopHeader
