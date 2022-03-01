import router from '@/router'
import store from '@/store'
import { Notify } from 'vant'
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

const whiteList = ['/login',] // 白名单列表

router.beforeEach(async (to, from, next) => {
  const title = to.params && to.params.title ? to.params.title : to.meta.title
  // 设置页面标题
  document.title = getPageTitle(to.meta.title)
  //设置页面顶部标题
  store.commit("user/setApplicationTitle", title);

  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/') {
      // 已经登录，跳转到首页
      next({ path: '/directoryIndex' })
    } else {
      // 获取用户信息
      const hasGetUserInfo = store.getters.userData && store.getters.userData.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          
          // debugger 接接口要打开
          // await store.dispatch('user/getInfo')
          next()
        } catch (error) {
          // 清除用户信息，退出登录，跳转登录页
          store.commit('user/logout')
          Notify.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
        }
      }
    }
  } else {
    /* has no token */
    if (whiteList.indexOf(to.path) !== -1) {
      // 白名单中，无需验证
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
    }
  }
})
