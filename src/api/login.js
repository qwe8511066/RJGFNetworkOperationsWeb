import request from '@/utils/request'

//登录
export async function authenticate(data) {
  return new Promise((resolve, reject) => {
    try {
      request({
        url: '/api/TokenAuth/Authenticate',
        method: 'post',
        data
      }).then(
        data => {
          resolve(data)
        }).catch(error => {
          reject(error)
        })
    } catch (error) {
      console.log(error);
    }
  })
}


//获取用户角色

export async function getCurrentLoginInformations() {
  return new Promise((resolve, reject) => {
    try {
      request({
        url: '/api/services/app/Session/GetCurrentLoginInformations',
        method: 'get',
      }).then(
        data => {
          resolve(data)
        }).catch(error => {
          reject(error)
        })
    } catch (error) {
      console.log(error);
    }
  })
}
