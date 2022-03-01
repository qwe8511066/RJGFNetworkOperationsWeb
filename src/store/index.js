import Vue from 'vue'
import Vuex from 'vuex'
import createLoadingPlugin from 'utils/vuex-loading'

Vue.use(Vuex)

const files = require.context('./modules', false, /\.js$/)
const modules = {}

files.keys().forEach(key => {
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

export default new Vuex.Store({
  plugins: [createLoadingPlugin()],
  state: {
    direction: 'forward', // 页面切换方向
    LOADING: false // 页面整个加载 状态
  },
  getters: {
    userData(state, getters) {
      return state.user.user
      // return getters['user/user']
    },
    user(state) {
      return state.user
    }
    // vuex 全局getters引入局部
    // token () {
    //   return store.getters['user/token']
    // }
  },
  mutations: {
    // 更新页面切换方向
    updateDirection(state, direction) {
      state.direction = direction
    },
    showLoading(state) {
      state.LOADING = true
    },
    hideLoading(state) {
      state.LOADING = false
    }
  },
  actions: {

  },
  modules
})
