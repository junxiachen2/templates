import UserInfo from '../views/user/userInfo'
import UserDetail from '../views/user/userDetail'

const Routes = {
  // 菜单路由
  menus: [
    {
      key: '/admin/user',
      title: '用户',
      icon: 'scan',
      subs: [
        { key: '/admin/user/info', title: '信息', component: UserInfo }
      ]
    }
  ],
  others: [
    { key: '/admin/user/detail', title: '详情', component: UserDetail }
  ]
}

export default Routes
