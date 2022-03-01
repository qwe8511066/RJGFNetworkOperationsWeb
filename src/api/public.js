import service from '@/utils/request';
import request from '@/utils/request'
import store from '@/store/index'
// 上传图片后。保存图片列表跟表单ID 关联起来
// 由于是表单修改或者上传成功后才返回的id 所以用 async 这种写法
export async function moveFileCommon(data) {
  return new Promise((resolve, reject) => {
    try {
      service.post(process.env.VUE_APP_UPLOADFILE_URL + 'api/services/app/CommonFile/MoveFileCommon', data, {
        headers: {
          'Authorization': 'Bearer ' + store.getters.token
        }
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


// 根据sourceId 获取上传文件列表
export function commonGetFileBySourceId(id) {
  return request({
    url: process.env.VUE_APP_UPLOADFILE_URL + 'api/services/app/CommonFile/CommonGetFileBySourceId',
    method: 'post',
    data: { id: id },
    headers: {
      'Authorization': 'Bearer ' + store.getters.token
    }
  })
}

// 根据文件id 获取上传文件
export function commonGetFileById(id) {
  return request({
    url: process.env.VUE_APP_UPLOADFILE_URL + 'api/services/app/Attachments/GetAttachmentsById',
    method: 'post',
    data: { id: id },
    headers: {
      'Authorization': 'Bearer ' + store.getters.token
    }
  })
}
// 根据id,tableName 获取上传文件列表
export function commonGetFileBySourceIdAndTableName(id, tableName) {
  return request({
    headers: {
      'Authorization': 'Bearer ' + store.getters.token
    },
    url: process.env.VUE_APP_UPLOADFILE_URL + 'api/services/app/CommonFile/CommonGetFileBySourceId',
    method: 'post',
    data: { id: id, tableName: tableName, sysName: "OA" }
  })
}
// 根据id,tableName,system 获取上传文件列表
export function commonGetFileBySourceIdAndTableNameAndSystem(id, tableName, system) {
  return request({
    headers: {
      'Authorization': 'Bearer ' + store.getters.token
    },
    url: process.env.VUE_APP_UPLOADFILE_URL + 'api/services/app/CommonFile/CommonGetFileBySourceId',
    method: 'post',
    data: { id: id, tableName: tableName, sysName: system }
  })
}

