import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import menuRoutes from '../../config/routes'
import { Menu, Icon } from 'antd'

class SiderMenu extends Component {
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
    if (item.subs) {
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
    else {
      return this.renderMenuItem(item)
    }
  }

  render () {
    const { pathname } = this.props.location
    return (
      <Menu
        style={{ height: '100%' }}
        mode="inline"
        defaultSelectedKeys={[pathname]}
        defaultOpenKeys={[pathname.substr(0, pathname.lastIndexOf('/'))]}
      >
        {
          menuRoutes.menus.map(item => this.renderSubMenu(item))
        }
      </Menu>
    )
  }
}

export default withRouter(SiderMenu)
