import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'
import { getToken } from '@/utils/auth'
import {
  checkObjectString
} from '.'
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_SERVE_URL, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 25000 // request timeout
})
// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.user.token) {
      config.headers['Authorization'] = 'Bearer ' + getToken()
    }
    return config
  },
  error => {
    console.log(error, 'err') // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (response.status !== 200 && !res.success) {
      const message = res.error.message ? res.error.message : '服务器错误';
      Toast.fail({
        message: message,
        duration: 1.5 * 1000
      })
      return Promise.reject(new Error(res.error.message || 'Error'))
    } else {
      return res.result ? res.result : res;
    }
  },
  error => {
    const data = {
      error
    };
    // console.log(data);
    const value = checkObjectString(data, 'error.response.data.error.message');
    const message = value ? value : data.error.message

    //请求超时
    if (data.error.code === "ECONNABORTED") {
      Toast('请求超时了！请联系管理员');
      return Promise.reject(error)
    }

    // 判断有返回才继续检测错误
    if (data.error.response) {
      switch (data.error.response.status) {
        case 401:
          Toast('用户未登录');
          // window.location.href = process.env.VUE_APP_LOGIN_URL
          break;
        case 404:
          Toast('暂无该接口，请查看');
          break;

        default:
          Toast(message);
          break;
      }
    } else {
      Toast(message);
    }
    return Promise.reject(error)
  }
)

export default service
