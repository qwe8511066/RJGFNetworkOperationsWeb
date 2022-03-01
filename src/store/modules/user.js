import {
  login,
  getInfo
} from 'api/user'
import { getCurrentLoginInformations } from '@/api/login'
import {
  Toast
} from 'vant'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'
import {
  resetRouter
} from '@/router'
import request from '@/utils/request'
// import router from '@/router'

const LOGIN = 'LOGIN' // 获取用户信息
const SetUserData = 'SetUserData' // 获取用户信息
const LOGOUT = 'LOGOUT' // 退出登录、清除用户数据
const USER_DATA = 'userDate' // 用户数据

export default {
  namespaced: true,
  state: {
    token: getToken() || '',

    //用户信息
    user: null,

    //员工信息
    employee: null,
    applicationTitle: null
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_EMPLOYEE: (state, employee) => {
      state.employee = employee
    },
    setApplicationTitle: (state, applicationTitle) => {
      state.applicationTitle = applicationTitle
    },
  },
  actions: {
    setToken({
      commit
    }, token) {
      commit('SET_TOKEN', token)
    },
    setUser({
      commit
    }, user) {
      commit('SET_USER', user)
    },
    async login(state, data) {
      try {
        let res = await login({
          usernameOrEmailAddress: data.usernameOrEmailAddress,
          password: data.password
        })
        // const item = state.commit(LOGIN, res)

        // Toast({
        //   message: '登录成功',
        //   position: 'middle',
        //   duration: 1500
        // })
        // setToken()
        // setTimeout(() => {
        //   const redirect = data.$route.query.redirect || '/'
        //   data.$router.replace({
        //     path: redirect
        //   })
        // }, 1500)
      } catch (error) { }
    },
    // 获取用户详情
    getInfo({
      commit,
      state
    }) {
      // getCurrentLoginInformations().then(data => {
      //   commit('SET_USER', data.user);
      //   commit('SET_EMPLOYEE', data.employee)
      // }).catch(error => {
      //   reject(error)
      // })

      return new Promise((resolve, reject) => {
        try {
          request({
            url: '/api/services/app/Session/GetCurrentLoginInformations',
            method: 'get',
          }).then(
            data => {
              commit('SET_USER', data.user);
              commit('SET_EMPLOYEE', data.employee)
              resolve(data)
            }).catch(error => {
              reject(error)
            })
        } catch (error) {
          console.log(error);
        }
      })
    },

    // 退出登录
    logout({
      commit,
      state,
      dispatch
    }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        commit('SET_USER', {})
        commit('SET_EMPLOYEE', {})
        removeToken()
        resetRouter()
        resolve()
      })
    },
  },
  getters: {
    token(state) {
      return state.token
    },
    user(state) {
      return state
    },
    employee(state) {
      return state.employee
    }
  }
}
