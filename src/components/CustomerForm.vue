<template>
  <div>
    <van-form ref="customerForm" class="customerForm" @submit="onSubmit">
      <div
        v-for="(item,index) in createtOrUpdateFrow_TemplateInfos"
        :key="index"
        @click="clickRow(item,index,$event)"
      >
        <div :class="{pointerEvents:preview}">
          <van-field
            class="myField"
            :key="index"
            :required=" item.editFrow_TemplateInfo_ColumDto.isNull"
            v-model="form[item.editFrow_TemplateInfo_ColumDto.fieldES]"
            v-if="item.editFrow_TemplateInfo_ColumDto.controlType == 'text'"
            :disabled="!item.editFrow_TemplateInfo_ColumDto.isWrite"
            :label="item.editFrow_TemplateInfo_ColumDto.fieldName"
            @input="outPutForm(item,index,$event)"
            :placeholder="item.editFrow_TemplateInfo_ColumDto.placeholder"
            :rules="[{ required: item.editFrow_TemplateInfo_ColumDto.isNull, message: '这是必填项' }]"
          ></van-field>

          <van-field
            class="myField"
            :key="index"
            rows="3"
            type="textarea"
            :required=" item.editFrow_TemplateInfo_ColumDto.isNull"
            autosize
            v-model="form[item.editFrow_TemplateInfo_ColumDto.fieldES]"
            v-if="item.editFrow_TemplateInfo_ColumDto.controlType == 'textarea'"
            @input="outPutForm(item,index,$event)"
            :label="item.editFrow_TemplateInfo_ColumDto.fieldName"
            :placeholder="item.editFrow_TemplateInfo_ColumDto.placeholder"
            :rules="[{ required: item.editFrow_TemplateInfo_ColumDto.isNull, message: '这是必填项' }]"
          ></van-field>

          <van-field
            class="myField"
            :key="index"
            :required=" item.editFrow_TemplateInfo_ColumDto.isNull"
            v-if="item.editFrow_TemplateInfo_ColumDto.controlType == 'select'"
            readonly
            clickable
            name="picker"
            :disabled="!item.editFrow_TemplateInfo_ColumDto.isWrite"
            :label="item.editFrow_TemplateInfo_ColumDto.fieldName"
            :value="form[item.editFrow_TemplateInfo_ColumDto.fieldES]"
            @input="outPutForm(item,index,$event)"
            :rules="[{ required: item.editFrow_TemplateInfo_ColumDto.isNull, message: '这是必填项' }]"
            @click="clickSelect(item)"
          >
            <template #button>
              <div>
                <van-button
                  color="#396dfe"
                  size="small"
                  v-if="form[item.editFrow_TemplateInfo_ColumDto.fieldES]"
                  @click="emptyFn($event,item,index)"
                >清空</van-button>
                <span v-if="!form[item.editFrow_TemplateInfo_ColumDto.fieldES]">选择</span>
              </div>
            </template>
          </van-field>

          <van-field
            class="myField"
            :required=" item.editFrow_TemplateInfo_ColumDto.isNull"
            :key="index"
            v-if="item.editFrow_TemplateInfo_ColumDto.controlType == 'radio'"
            :label="item.editFrow_TemplateInfo_ColumDto.fieldName"
            :placeholder="item.editFrow_TemplateInfo_ColumDto.placeholder"
          >
            <template #input>
              <van-radio-group
                v-model="item.editFrow_TemplateInfo_ColumDto.defaultValue"
                direction="horizontal"
                @change="outPutForm(item,index,$event)"
              >
                <van-radio
                  :name="box.value"
                  v-for="(box,i) in item.controlSourceDatas"
                  :key="i"
                >{{box.label}}</van-radio>
              </van-radio-group>
            </template>
          </van-field>

          <van-field
            class="myField"
            :required=" item.editFrow_TemplateInfo_ColumDto.isNull"
            :key="index"
            v-if="item.editFrow_TemplateInfo_ColumDto.controlType == 'checkbox'"
            :label="item.editFrow_TemplateInfo_ColumDto.fieldName"
            :placeholder="item.editFrow_TemplateInfo_ColumDto.placeholder"
            :rules="[{ required: item.editFrow_TemplateInfo_ColumDto.isNull, message: '这是必填项' }]"
          >
            <template #input>
              <van-checkbox-group
                v-model="form[item.editFrow_TemplateInfo_ColumDto.fieldES]"
                direction="horizontal"
                @change="outPutForm(item,index,$event)"
              >
                <van-checkbox
                  shape="square"
                  :name="box.label"
                  v-for="(box,i) in item.controlSourceDatas"
                  :key="i"
                >{{box.label}}</van-checkbox>
              </van-checkbox-group>
            </template>
          </van-field>

          <van-field
            class="myField"
            :required=" item.editFrow_TemplateInfo_ColumDto.isNull"
            :key="index"
            v-if="item.editFrow_TemplateInfo_ColumDto.controlType == 'datePicker'"
            name="picker"
            :disabled="!item.editFrow_TemplateInfo_ColumDto.isWrite"
            :label="item.editFrow_TemplateInfo_ColumDto.fieldName"
            :value="form[item.editFrow_TemplateInfo_ColumDto.fieldES]"
            :rules="[{ required: item.editFrow_TemplateInfo_ColumDto.isNull, message: '这是必填项' }]"
            @click="clickSelect(item)"
          >
            <template #button>
              <div>
                <van-button
                  size="small"
                  color="#396dfe"
                  v-if="form[item.editFrow_TemplateInfo_ColumDto.fieldES]"
                  @click="emptyFn($event,item,index)"
                >清空</van-button>
                <span v-if="!form[item.editFrow_TemplateInfo_ColumDto.fieldES]">选择</span>
              </div>
            </template>
          </van-field>

          <van-field
            class="myField"
            :disabled="!item.editFrow_TemplateInfo_ColumDto.isWrite"
            :value="form[item.editFrow_TemplateInfo_ColumDto.fieldES]"
            :label="item.editFrow_TemplateInfo_ColumDto.fieldName"
            :placeholder="item.editFrow_TemplateInfo_ColumDto.placeholder"
            :rules="[{ required: item.editFrow_TemplateInfo_ColumDto.isNull, message: '这是必填项' }]"
            :required=" item.editFrow_TemplateInfo_ColumDto.isNull"
            :key="index"
            v-if="item.editFrow_TemplateInfo_ColumDto.controlType == 'inputNumber'||item.editFrow_TemplateInfo_ColumDto.controlType == 'numeric'"
          >
            <template #input>
              <vue-numeric-input
                :step="item.editFrow_TemplateInfo_ColumDto.controlType == 'inputNumber'?1:0.1"
                :precision="item.editFrow_TemplateInfo_ColumDto.controlType == 'inputNumber'?0:2"
                class="myNumberInput"
                @change="outPutForm(item,index,$event)"
                v-model="form[item.editFrow_TemplateInfo_ColumDto.fieldES]"
                :min="item.editFrow_TemplateInfo_ColumDto.nzMin?item.editFrow_TemplateInfo_ColumDto.nzMin:-2147483648"
                :max="item.editFrow_TemplateInfo_ColumDto.nzMax?item.editFrow_TemplateInfo_ColumDto.nzMax:2147483647"
                inline
                controls
              ></vue-numeric-input>
            </template>
          </van-field>

          <van-divider
            :key="index"
            :content-position="item.editFrow_TemplateInfo_ColumDto.defaultValue?item.editFrow_TemplateInfo_ColumDto.defaultValue:'center'"
            v-if="item.editFrow_TemplateInfo_ColumDto.controlType == 'partitionLine'"
          >{{item.editFrow_TemplateInfo_ColumDto.fieldName}}</van-divider>

          <van-field
            class="myField"
            :required=" item.editFrow_TemplateInfo_ColumDto.isNull"
            :key="index"
            v-if="item.editFrow_TemplateInfo_ColumDto.controlType == 'cityCountyAndDistrict'"
            :disabled="!item.editFrow_TemplateInfo_ColumDto.isWrite"
            :label="item.editFrow_TemplateInfo_ColumDto.fieldName"
            :value="cityValue(item.controlSourceDatas)"
            @click="clickSelect(item)"
            v-model="form[item.editFrow_TemplateInfo_ColumDto.fieldES]"
            :rules="[{ required: item.editFrow_TemplateInfo_ColumDto.isNull, message: '这是必填项' }]"
          >
            <template #button>
              <div>
                <van-button
                  size="small"
                  color="#396dfe"
                  v-if="form[item.editFrow_TemplateInfo_ColumDto.fieldES]"
                  @click="emptyFn($event,item,index)"
                >清空</van-button>
                <span v-if="!form[item.editFrow_TemplateInfo_ColumDto.fieldES]">选择</span>
              </div>
            </template>
          </van-field>

          <van-field
            class="flexRightWidth myField"
            :required=" item.editFrow_TemplateInfo_ColumDto.isNull"
            :key="index"
            v-model="form[item.editFrow_TemplateInfo_ColumDto.fieldES]"
            v-if="item.editFrow_TemplateInfo_ColumDto.controlType == 'ueditor'"
            :disabled="!item.editFrow_TemplateInfo_ColumDto.isWrite"
            :label="item.editFrow_TemplateInfo_ColumDto.fieldName"
            :placeholder="item.editFrow_TemplateInfo_ColumDto.placeholder"
            :rules="[{ required: item.editFrow_TemplateInfo_ColumDto.isNull, message: '这是必填项' }]"
          >
            <template #input>
              <div class="flexBox width10">
                <m-quill-editor
                  class="flex1"
                  :has-border="quill.border"
                  v-model="form[item.editFrow_TemplateInfo_ColumDto.fieldES]"
                  :sync-output="quill.syncOutput"
                  :theme="quill.theme"
                  @change="changeUeditor(item,$event,index)"
                  :disabled="quill.disabled"
                  :fullscreen="quill.full"
                  :toolbar="quill.toolbar"
                ></m-quill-editor>
              </div>
            </template>
          </van-field>

          <van-field
            class="myField"
            :required=" item.editFrow_TemplateInfo_ColumDto.isNull"
            :key="index"
            v-if="item.editFrow_TemplateInfo_ColumDto.controlType == 'upload'"
            :disabled="!item.editFrow_TemplateInfo_ColumDto.isWrite"
            :label="item.editFrow_TemplateInfo_ColumDto.fieldName"
            :placeholder="item.editFrow_TemplateInfo_ColumDto.placeholder"
            :rules="[{ required: item.editFrow_TemplateInfo_ColumDto.isNull, message: '这是必填项' }]"
          >
            <template #input>
              <div class="customerUpload width10">
                <van-uploader
                  multiple
                  :preview-full-image="false"
                  v-model="form[item.editFrow_TemplateInfo_ColumDto.fieldES]"
                  :after-read="(file,detail)=>onRead(file,item,index)"
                >
                  <van-button icon="plus" color="#396dfe" block>点击上传</van-button>
                </van-uploader>
                <div
                  v-for="(box,i) in form[item.editFrow_TemplateInfo_ColumDto.fieldES]"
                  class="flexBox"
                  :key="i"
                >
                  <div class="flex1 flexLeftContent" @click="downloadUpload(box)">{{box.label}}</div>
                  <div
                    v-if="box.status == 'loading'"
                    class="padding10"
                    @click="deleteUpload(item,i,index)"
                  >
                    <van-loading size="16px"></van-loading>
                  </div>
                  <div
                    class="padding10 flexContent"
                    v-if="!box.status"
                    @click="deleteUpload(item,i,index)"
                  >
                    <van-icon name="close" size="16px" />
                  </div>
                </div>
              </div>
            </template>
          </van-field>

          <van-field
            class="myField"
            :key="index"
            :required=" item.editFrow_TemplateInfo_ColumDto.isNull"
            :value="form[item.editFrow_TemplateInfo_ColumDto.fieldES + 'choice']"
            v-if="item.editFrow_TemplateInfo_ColumDto.controlType == 'choicePerson' || item.editFrow_TemplateInfo_ColumDto.controlType == 'choiceStation' || item.editFrow_TemplateInfo_ColumDto.controlType == 'choiceDeptartment'"
            :disabled="!item.editFrow_TemplateInfo_ColumDto.isWrite"
            :label="item.editFrow_TemplateInfo_ColumDto.fieldName"
            :placeholder="item.editFrow_TemplateInfo_ColumDto.placeholder"
            @click="clickChoice(item)"
            :rules="[{ required: item.editFrow_TemplateInfo_ColumDto.isNull, message: '这是必填项' }]"
          >
            <template #input>
              <div class="customerTags">
                <van-tag
                  v-for="(box,i) in item.controlSourceDatas"
                  :key="i"
                  closeable
                  size="medium"
                  type="primary"
                  @close="closeTag(item,i)"
                >{{box.label}}</van-tag>
              </div>
            </template>

            <template #button>
              <span v-if="item.controlSourceDatas&&item.controlSourceDatas.length == 0">选择</span>
            </template>
          </van-field>

          <!-- 手机端不需要table的新增和删除  因为不直观 -->
          <div
            class="myCard"
            v-if="item.editFrow_TemplateInfo_ColumDto.controlType == 'table' && item.childrenTable && item.childrenTable.length>0"
            :key="index"
          >
            <div v-for="(box,a) in item.controlTableRows" :key="a">
              <div v-for="(pipo,i) in box.colValues" :key="i">
                <van-field
                  class="myField"
                  :key="i"
                  v-if="pipo.controlType == 'datePicker'"
                  name="picker"
                  placeholder="请输入"
                  :label="box.colValues[i].fieldName"
                  :value="pipo.defaultValue"
                  @click="clickSelect(item,pipo)"
                >
                  <template #button>
                    <div>
                      <van-button
                        color="#396dfe"
                        size="small"
                        v-if="pipo.defaultValue"
                        @click="emptyTableFn($event,pipo)"
                      >清空</van-button>
                      <span v-if="!pipo.defaultValue">选择</span>
                    </div>
                  </template>
                </van-field>

                <van-field
                  class="myField"
                  :key="i"
                  v-model="pipo.defaultValue"
                  v-if="pipo.controlType == 'inputNumber'"
                  type="number"
                  :label=" box.colValues[i].fieldName"
                  placeholder="请输入"
                ></van-field>

                <van-field
                  class="myField"
                  :key="i"
                  v-model="pipo.defaultValue"
                  v-if="pipo.controlType == 'text'"
                  placeholder="请输入"
                  :label=" box.colValues[i].fieldName"
                  maxlength="100"
                ></van-field>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-form>
    <van-popup v-model="showSelect" position="bottom">
      <van-picker
        show-toolbar
        :columns="selectList"
        @confirm="selectConfirm"
        @cancel="showSelect = false"
        :default-index="selectIndex"
      />
    </van-popup>

    <van-popup v-model="showPicker" position="bottom">
      <van-datetime-picker
        type="date"
        v-model="currentPicker"
        @confirm="selectConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>

    <van-popup v-model="showCityCountyAndDistrict" position="bottom">
      <van-area
        :area-list="cityCountyAndDistrictList"
        :value="cityCountyAndDistrictValue"
        @confirm="selectConfirm"
        @cancel="showCityCountyAndDistrict = false"
      />
    </van-popup>

    <van-popup
      v-model="showChoice"
      :overlay="showChoice"
      v-if="showChoice"
      :close-on-click-overlay="false"
      position="bottom"
    >
      <public-choose
        @close="closeChoice"
        :isOneSelect="currentObject.editFrow_TemplateInfo_ColumDto.isOneSelect"
        :checkboxAttribute.sync="checkboxAttribute"
        :column.sync="column"
        :listServe="listServe"
      ></public-choose>
    </van-popup>

    <van-overlay :show="showOverlay" z-index="999">
      <div class="wrapper" @click.stop>
        <van-loading size="24px" type="spinner" color="#fff" vertical>上传文件中...</van-loading>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { checkArray, checkArrayString, uuid, removeComma } from '@/utils/index'
import { Toast } from 'vant'
import service from '@/utils/request'
import publicChoose from './publicChoose'
import MQuillEditor from 'vue-m-quill-editor'
import moment from 'moment'
export default {
  name: 'customerForm',
  components: {
    MQuillEditor,
    publicChoose,
  },
  data() {
    return {
      checkboxAttribute: {
        type: 'value',
        value: [],
        dataType: 'id',
      },
      column: [],
      listServe: '',
      showChoice: false,
      showOverlay: false,
      fileList: [],
      quill: {
        border: false,
        content: '',
        syncOutput: false,
        theme: 'snow', //bubble snow
        disabled: false,
        full: false,
        toolbar: [
          [{ header: 1 }, { header: 2 }],
          ['bold', 'italic', 'underline', 'strike'],
        ],
      },
      //表单对象  控制必填这类操作 因为获取的数据不一致
      form: {},
      //显示下拉框的
      showSelect: false,

      //下拉框默认展示值的下标
      selectIndex: 0,

      //下拉框的数组
      selectList: [],

      //显示时间框的
      showPicker: false,
      //时间框当前的值
      currentPicker: null,

      //展示市县区的
      showCityCountyAndDistrict: false,
      //市县区的json
      cityCountyAndDistrictList: this.$PublicEnumeration.positionEnum,
      cityCountyAndDistrictValue: null,

      //当前对象
      currentObject: null,

      //当前Td对象
      currentTdObject: null,
    }
  },
  props: {
    //从父级获取的表单组件
    createtOrUpdateFrow_TemplateInfos: {
      type: Array,
      default() {
        return []
      },
    },

    //判断是否是预览
    preview: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      if (checkArray(this.createtOrUpdateFrow_TemplateInfos)) {
        this.createtOrUpdateFrow_TemplateInfos.forEach((item) => {
          const dto = item.editFrow_TemplateInfo_ColumDto
          const type = dto.controlType
          const defaultValue = dto.defaultValue ? dto.defaultValue : null
          //判断必填 生成对应的规则
          let checkList = []
          if (type == 'text' || type == 'textarea' || type == 'ueditor') {
            this.dynamic(dto, defaultValue, 0)
          } else if (type == 'inputNumber') {
            this.dynamic(dto, Number(defaultValue), 0)
          } else if (type == 'datePicker') {
            const yyyyMMDD = defaultValue
              ? moment(defaultValue).format('YYYY-MM-DD')
              : defaultValue
            this.dynamic(dto, yyyyMMDD, 0)
          } else if (type == 'table') {
            if (checkArray(item.controlTableRows)) {
              item.controlTableRows.forEach((box) => {
                box.colValues.forEach((p) => {
                  p.defaultValue =
                    p.controlType == 'datePicker' && p.defaultValue
                      ? moment(p.defaultValue).format('YYYY-MM-DD')
                      : p.defaultValue
                })
              })
            }
          } else if (type == 'checkbox') {
            item.controlSourceDatas.forEach((box) => {
              if (box.value === 'true') {
                checkList.push(box.label)
              }
            })
            this.dynamic(dto, checkList, 1)
          } else if (type == 'cityCountyAndDistrict') {
            this.dynamic(dto, this.cityValue(item.controlSourceDatas), 0)
          } else if (type == 'upload' || type == 'download') {
            item.controlSourceDatas = item.controlSourceDatas
              ? item.controlSourceDatas
              : []
            this.dynamic(dto, item.controlSourceDatas, 1)
          } else if (
            item.editFrow_TemplateInfo_ColumDto.controlType == 'choicePerson' ||
            item.editFrow_TemplateInfo_ColumDto.controlType ==
              'choiceStation' ||
            item.editFrow_TemplateInfo_ColumDto.controlType ==
              'choiceDeptartment'
          ) {
            if (dto.isNull) {
              const label = checkArray(item.controlSourceDatas) ? '有值' : ''
              this.$set(this.form, dto.fieldES + 'choice', label)
            }
          }
        })
      }
    },
    //动态校验和设置表单  减少代码量
    dynamic(dto, defaultValue, type) {
      this.$set(this.form, dto.fieldES, defaultValue)
    },

    //常用的必填input 回传回去。父级修改对应的操作
    outPutForm(item, index, event, type = true) {
      this.$emit('outPutForm', {
        item: item,
        //返回列表对象
        index: index,
        //返回当前点击对象
        event: event,

        //是否添加
        type: type,
      })
    },

    //开启select
    clickSelect(value, box) {
      const dto = value.editFrow_TemplateInfo_ColumDto
      this.currentObject = value
      switch (dto.controlType) {
        case 'select':
          this.selectList = []
          eval(
            value.controlSourceDatas
              ? value.controlSourceDatas
              : value.editFrow_TemplateInfo_ColumDto.sourceData
          ).forEach((box) => {
            this.selectList.push(box.label)
          })
          if (value.editFrow_TemplateInfo_ColumDto.defaultValue) {
            this.selectIndex = checkArrayString(
              this.selectList,
              '',
              value.editFrow_TemplateInfo_ColumDto.defaultValue
            )
          }
          this.showSelect = true
          break

        case 'datePicker':
          this.currentPicker = this.form[dto.fieldES]
            ? moment(this.form[dto.fieldES])._d
            : new Date()
          this.showPicker = true
          break

        case 'table':
          this.currentTdObject = box

          this.currentPicker = box.defaultValue
            ? moment(box.defaultValue)._d
            : new Date()
          this.showPicker = true
          break
        case 'cityCountyAndDistrict':
          this.cityCountyAndDistrictValue =
            value.controlSourceDatas && checkArray(value.controlSourceDatas)
              ? value.controlSourceDatas[value.controlSourceDatas.length - 1]
                  .value
              : null
          this.showCityCountyAndDistrict = true
          break
      }
    },
    //清空
    emptyFn(e, value, index) {
      e.stopPropagation()
      this.$set(this.form, value.editFrow_TemplateInfo_ColumDto.fieldES, null)
      this.outPutForm(value, index, null)
      this.$refs.customerForm.validate()
      this.showSelect = false
    },

    emptyTableFn(e, value) {
      e.stopPropagation()
      value.defaultValue = null
    },
    //关闭select
    selectConfirm(value) {
      const dto = this.currentObject.editFrow_TemplateInfo_ColumDto
      let event = ''
      switch (dto.controlType) {
        case 'select':
          event = value
          this.$set(this.form, dto.fieldES, event)
          break

        case 'datePicker':
          event = moment(value).format('YYYY-MM-DD')
          this.$set(this.form, dto.fieldES, event)
          break

        case 'cityCountyAndDistrict':
          event = []
          value.forEach((item, index) => {
            if (typeof item == 'undefined') {
              value.splice(index, 1)
              index--
            } else {
              event.push({
                value: item.code,
                label: item.name,
              })
            }
          })
          this.$set(this.form, dto.fieldES, this.cityValue(value, 'name'))
          break

        case 'table':
          event = moment(value).format('YYYY-MM-DD')
          this.currentTdObject.defaultValue = event
          break
      }
      const index = checkArrayString(
        this.createtOrUpdateFrow_TemplateInfos,
        'editFrow_TemplateInfo_ColumDto.fieldES',
        dto.fieldES
      )
      this.outPutForm(this.currentObject, index, event)
      this.showCityCountyAndDistrict = false
      this.showSelect = false
      this.showPicker = false
    },

    //change 富文本
    changeUeditor(value, e, index) {
      let html = e.editor.scroll.domNode.innerHTML
      if (html == `<p><br></p>`) {
        html = ``
      }
      this.$set(this.form, value.editFrow_TemplateInfo_ColumDto.fieldES, html)
      this.outPutForm(value, index, html)
      this.$refs.customerForm.validate()
    },

    downloadUpload(value) {
      if (value.status) {
        return false
      }
      window.open(
        process.env.VUE_APP_SERVE_URL +
          '/api/TokenAuth/DownloadTempFileNew?fileType=' +
          value.otherValue1 +
          '&fileToken=' +
          value.value +
          '&fileName=' +
          value.label +
          '&filePath=' +
          value.otherValue
      )
    },

    //上传框的delete
    deleteUpload(value, i, index) {
      this.outPutForm(value, index, null, false)
      this.form[value.editFrow_TemplateInfo_ColumDto.fieldES].splice(i, 1)
      this.$refs.customerForm.validate()
    },

    //上传文件流成功之后
    onRead(file, value, index) {
      this.showOverlay = true
      this.currentObject = value
      const items = checkArray(file) ? file : [file]
      items.forEach((item) => {
        item.status = 'loading'
        item.label = item.file.name
        item.uuid = uuid()
        let fd = new FormData()
        fd.append('file', item.file)
        service
          .post(
            process.env.VUE_APP_FLOW_URL +
              `api/services/app/WorkFlowedFrowManager/UploadFileCommon`,
            fd
          )
          .then(
            (data) => {
              Object.keys(data).forEach((key) => {
                item[key] = data[key]
              })
              this.outPutForm(value, index, data)
              item.status = null
              this.showOverlay = false
            },
            (err) => {
              this.showOverlay = false
              Toast({
                message: item.label + ' 上传失败',
                position: 'middle',
                duration: 3000,
              })
              const i = checkArrayString(
                this.form[value.editFrow_TemplateInfo_ColumDto.fieldES],
                'uuid',
                item.uuid
              )
              this.form[value.editFrow_TemplateInfo_ColumDto.fieldES].splice(
                i,
                1
              )
            }
          )
      })
    },

    //选人选岗位
    clickChoice(value) {
      const dto = value.editFrow_TemplateInfo_ColumDto
      value.editFrow_TemplateInfo_ColumDto.isOneSelect = value
        .editFrow_TemplateInfo_ColumDto.isOneSelect
        ? value.editFrow_TemplateInfo_ColumDto.isOneSelect
        : false
      this.currentObject = value
      switch (dto.controlType) {
        //选人
        case 'choicePerson':
          this.listServe = '/api/services/app/BaseUser/CommonSelectUsersByPage'
          this.column = [
            {
              label: '人员姓名',
              value: 'realName',
            },
          ]
          break

        //选部门
        case 'choiceDeptartment':
          this.listServe =
            '/api/services/app/DepartmentPostUser/DepartmentsListByPage'
          this.column = [
            {
              label: '部门名称',
              value: 'name',
            },
            {
              label: '部门路径',
              value: 'fullPath',
            },
          ]
          break

        //选岗位
        case 'choiceStation':
          this.listServe = '/api/services/app/Post/PostListByPage'
          this.column = [
            {
              label: '岗位名称',
              value: 'name',
            },
            {
              label: '描述',
              value: 'describe',
            },
          ]
          break
      }
      value.controlSourceDatas = checkArray(value.controlSourceDatas)
        ? value.controlSourceDatas
        : []
      this.checkboxAttribute.value = value.controlSourceDatas
      this.showChoice = true
    },

    //选人选部门选岗位的关闭
    closeTag(value, index) {
      const list = value.controlSourceDatas
      list.splice(index, 1)
      this.outPutForm(value, index, list)
      if (value.editFrow_TemplateInfo_ColumDto.isNull) {
        const label = checkArray(list) ? '有值' : ''
        this.$set(
          this.form,
          value.editFrow_TemplateInfo_ColumDto.fieldES + 'choice',
          label
        )
      }
      this.$refs.customerForm.validate()
    },

    cityValue(list, name = 'label') {
      let value = ''
      if (checkArray(list)) {
        list.forEach((item) => {
          value += item[name] + ','
        })
        value = removeComma(value)
      }
      return value
    },

    //关闭选人选部门弹窗
    closeChoice(value) {
      if (value.type) {
        value.value.forEach((item) => {
          if (!item.label) {
            const label = item.realName ? item.realName : item.name
            item.label = label
            item.value = item.id
          }
        })
        this.currentObject.controlSourceDatas = value.value
        const label = checkArray(this.currentObject.controlSourceDatas)
          ? '有值'
          : ''
        this.$set(
          this.form,
          this.currentObject.editFrow_TemplateInfo_ColumDto.fieldES + 'choice',
          label
        )

        //选人  选部门  选岗位的回调
        this.outPutForm(
          this.currentObject,
          0,
          this.currentObject.controlSourceDatas
        )
      }
      this.checkboxAttribute.value = []
      this.showChoice = false
    },

    clickRow(item, index, event) {
      this.$emit('clickRow', {
        item: item,
        //返回列表对象
        index: index,
        //返回当前点击对象
        event: event,
      })
    },

    onSubmit() {
      this.$emit('onSubmit')
    },
  },
}
</script>
<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>