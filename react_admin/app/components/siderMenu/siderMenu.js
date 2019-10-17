import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import menuRoutes from '../../config/routes'
import { Menu, Icon } from 'antd'

class SiderMenu extends Component {
  // item.route 菜单单独跳转的路由
  renderMenuItem (item) {
    return (
      <Menu.Item key={item.key}>
        <Link to={(item.route || item.key) + (item.query || '')}>
          {item.icon && <Icon type={item.icon} />}
          <span>{item.title}</span>
        </Link>
      </Menu.Item>
    )
  }

  renderSubMenu (item) {
    return (
      <Menu.SubMenu
        key={item.key}
        title={
          <span>
            {item.icon && <Icon type={item.icon} />}
            <span>{item.title}</span>
          </span>
        }
      >
        {item.subs && item.subs.map(item => this.renderMenuItem(item))}
      </Menu.SubMenu>
    )
  }

  render () {
    return (
      <Menu
        style={{ height: '100%' }}
        mode="inline"
      >
        {/* {this.renderSubMenu(menuRoutes.menus)} */}
        {
          menuRoutes.menus.map(item => this.renderSubMenu(item))
        }
      </Menu>
    )
  }
}

export default SiderMenu
