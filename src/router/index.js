import Vue from 'vue'
import Router from 'vue-router'
// import Home from 'views/dashboard/index.vue'
import store from '@/store'
import { checkArray } from '../utils'

Vue.use(Router)

let routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('views/user/Login.vue'),
    meta: {
      title: '登录页',
      keepAlive: false
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ 'views/404.vue'),
    meta: {
      title: '404',
      keepAlive: false
    }
  },
]

const routerContext = require.context('./', true, /\.js$/)
routerContext.keys().forEach(route => {
  // 如果是根目录的 index.js 、不处理
  if (route.startsWith('./index')) {
    return
  }
  const routerModule = routerContext(route)
  /**
   * 兼容 import export 和 require module.export 两种规范
   */
  routes = routes.concat(routerModule.default || routerModule)
})

settagsView(routes)
export function settagsView(route) {
  if (checkArray(route)) {
    route.forEach(item => {
      store.dispatch("tagsView/addView", item);
      if (item && item.meta && item.meta.keepAlive) {
        store.dispatch("tagsView/addCachedView", item.name);
      }
      if (checkArray(item.children)) {
        settagsView(item.children)
      }
    })
  }
}


routes = routes.concat({
  path: '*',
  redirect: '/404'
})

const createRouter = () => new Router({
  // mode: 'history', // require service support
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes
})

const myRouter = createRouter()

// const myRouter = new Router({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes
// })

const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

myRouter.beforeEach((to, from, next) => {
  if (to.params.direction) {
    store.commit('updateDirection', to.params.direction)
  } else {
    const toIndex = history.getItem(to.path)
    const fromIndex = history.getItem(from.path)
    // 判断并记录跳转页面是否访问过，以此判断跳转过渡方式
    if (toIndex) {
      if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
        store.commit('updateDirection', 'slide-right')
      } else {
        store.commit('updateDirection', 'slide-left')
      }
    } else {
      ++historyCount
      history.setItem('count', historyCount)
      to.path !== '/' && history.setItem(to.path, historyCount)
      store.commit('updateDirection', 'slide-right')
    }
  }

  //记录缓存的路由的滚动高度
  if (from.meta.keepAlive) {
    const $content = document.querySelector('.routerScrollTopContent'); // 列表的外层容器
    const scrollTop = $content && $content.offsetParent ? $content.offsetParent.scrollTop : 0;
    from.meta.scrollTop = scrollTop;
  }

  next()
})

export function resetRouter() {
  myRouter.replace('/login')
}

export default myRouter
