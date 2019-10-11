
import Comp from './components'

const Routes = {
  // 菜单路由
  menus: [
    {
      key: '/admin/user',
      title: '用户',
      icon: 'scan',
      permission: [],
      subs: [
        { key: '/admin/user/info', title: '信息', component: Comp.UserInfo },
        { key: '/admin/user/detail', title: '详情', component: Comp.UserDetail, permission: [] }
      ]
    }
  ]
}

export default Routes
