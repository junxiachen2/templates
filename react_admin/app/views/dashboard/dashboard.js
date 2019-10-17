import React, { Component } from 'react'
import style from './dashboard.css'
import { Layout } from 'antd'
import Routes from '../../components/cRoutes'
import SiderMenu from '../../components/siderMenu/siderMenu'
import TopHeader from '../../components/topHeader/topHeader'
import APIFunction from '../../utils/apiFunction'

const { Footer, Sider, Content } = Layout

class Dashboard extends Component {
  render () {
    return (
      <Layout className={style.wrap}>
        <TopHeader />
        <Layout>
          <Sider><SiderMenu /></Sider>
          <Layout className={style.rightLayout}>
            <Content className={style.content}>
              <Routes />
            </Content>
            {/* <Footer className={style.footer}>
              React-Admin ©{new Date().getFullYear()}
            </Footer> */}
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

export default Dashboard

