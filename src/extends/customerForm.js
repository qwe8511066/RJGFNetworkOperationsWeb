import {
  checkArray,
  checkArrayString
} from '@/utils/index'
import service from '@/utils/request';
/**
 * 自定义表单的通用方法
 */
export default {
  data() {
    return {
      //优化表单返回值
      validateType: false,

      //路径数据
      routeList: null,
      activeName: '表单内容',
      loading: false,
      data: null,
    }
  },

  props: {

  },
  methods: {

    outPutForm(value) {
      const dto = value.item.editFrow_TemplateInfo_ColumDto;
      const info = this.data.createtOrUpdateFrow_TemplateInfos[value.index];
      if (dto.controlType == 'checkbox') {
        //清空已选或为选的checkbox
        info.controlSourceDatas.forEach((box) => {
          box.value = false
        })

        //判断已经的数组
        if (checkArray(value.event)) {
          //迭代已选的数组
          value.event.forEach((box) => {
            const index = checkArrayString(
              info.controlSourceDatas,
              'label',
              box
            )
            if (index != -1) {
              info.controlSourceDatas[index].value = true
            }
          })
        }
      } else if (dto.controlType == 'cityCountyAndDistrict') {
        info.controlSourceDatas = checkArray(value.event) ? value.event : []
      } else if (
        dto.controlType == 'choicePerson' ||
        dto.controlType == 'choiceStation' ||
        dto.controlType == 'choiceDeptartment'
      ) {
        info.controlSourceDatas = []
        value.event.forEach(item => {
          info.controlSourceDatas.push({
            label: item.label,
            value: item.value
          })
        })
      } else if (dto.controlType == 'upload') {
        console.log(info)
        if (value.type) {
          info.controlSourceDatas = checkArray(info.controlSourceDatas)
            ? info.controlSourceDatas
            : []
          info.controlSourceDatas.push(value.event)
        } else {
          info.controlSourceDatas.splice(value.index, 1)
        }
      } else {
        info.editFrow_TemplateInfo_ColumDto.defaultValue = value.event
      }
    },


    /**
     * 自定义表单或者业务表单获取详情的接口  改成通用
     */
    initForm(workFlow) {
      this.loading = true;
      const url = this.type === 'true' ? service.get(
        process.env.VUE_APP_FLOW_URL + `api/services/app/WorkFlowInstanceManager/GetWorkFlowInstanceFrowTemplateInfoById?workFlow_TemplateInfoId=${this.$route.params.workFlow_TemplateInfoId}&workFlow_InstanceId=${this.$route.params.workFlow_InstanceId}&workFlow_NodeAuditorRecordId=${this.$route.params.workFlow_NodeAuditorRecordId}&isReadOnly=${this.$route.params.isReadOnly}`
      ) : service.post(process.env.VUE_APP_FLOW_URL + `api/services/app/WorkFlowInstanceManager/Tenant_GetWorkFlowInstanceFrowTemplateInfoById`, workFlow);
      return url;
    },

    //根据流水号获取审批流程记录
    tenant_GetWorkFlow_NodeRecordAndAuditorRecords(data) {
      return service.post(
        process.env.VUE_APP_FLOW_URL +
        `api/services/app/WorkFlowInstanceManager/Tenant_GetWorkFlow_NodeRecordAndAuditorRecords`,
        data
      )
    },

    /**
     * 初始化待办流程  已办流程 我发起的流程详情  
     * 因为3种流程的初始都很类似 就是待办流程传的对象不一致而已
     * @param workFlow 获取业务表单的对象
     */
    initHandlingFlow(dto, workFlow, then) {
      Promise.all([
        this.tenant_GetWorkFlow_NodeRecordAndAuditorRecords(dto),
        this.initForm(workFlow)
      ]).then(data => {
        this.routeList = data[0]
        if (data[1]) {
          this.data = data[1]
        }
        if (then) then(data[1])
        this.loading = false
      })
    },

    //优化已办 待办 的多表单返回值判断
    returnValidate(formUrl) {
      return new Promise((resolve, reject) => {
        try {
          formUrl.validate().then(data => {
            resolve(data)
          }, err => {
            reject({
              value: formUrl,
              err: err
            })
          })
          // request({
          //   url: '/api/TokenAuth/Authenticate',
          //   method: 'post',
          //   data
          // }).then(
          //   data => {
          //     resolve(data)
          //   }).catch(error => {
          //     reject(error)
          //   })
        } catch (error) {
          console.log('try')
        }
      })
    },


  },
}
