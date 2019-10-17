import UserInfo from '../views/user/userInfo/index'
import GreyList from '../views/user/greylist/index'
import Income from '../views/income/index'

const Routes = {
  // 菜单路由
  menus: [
    {
      key: '/admin/user',
      title: '用户管理',
      icon: 'scan',
      subs: [
        { key: '/admin/user/info', title: '用户信息', component: UserInfo },
        { key: '/admin/user/greylist', title: '灰名单', component: GreyList }
      ]
    },
    {
      key: '/admin/income',
      title: '收入记录',
      icon: 'scan',
      component: Income
    }
  ],
  others: [
  ]
}

export default Routes
