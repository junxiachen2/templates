import React, { Component } from 'react'
import style from './dashboard.css'
import { Layout } from 'antd'
import Routes from '../../routes'
import SiderMenu from '../../components/siderMenu/siderMenu'
// import APIFunction from '../../services/index'

const { Header, Footer, Sider, Content } = Layout

class Dashboard extends Component {
  render () {
    return (
      <Layout className={style.wrap}>
        <Header className={style.header}>Header</Header>
        <Layout>
          <Sider><SiderMenu /></Sider>
          <Layout className={style.rightLayout}>
            <Content className={style.content}>
              <Routes />
            </Content>
            <Footer className={style.footer}>
              React-Admin ©{new Date().getFullYear()}
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

export default Dashboard

