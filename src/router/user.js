export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('views/user/Login.vue'),
    meta: {
      title: '用户注册'
    }
  },
  {
    path: '/informationMaintenance',
    name: 'informationMaintenance',
    component: () => import('views/user/InformationMaintenance.vue'),
    meta: {
      title: '用户信息维护'
    }
  }
]
