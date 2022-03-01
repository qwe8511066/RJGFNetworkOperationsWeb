export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('views/user/Login.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/informationMaintenance',
    name: 'informationMaintenance',
    component: () => import('views/user/InformationMaintenance.vue'),
    meta: {
      title: '注册'
    }
  }
]
