  <template #button>
  <van-field
    class="myField"
    :required="required"
    :disabled="disabled"
    :class="{pointerEvents:disabled}"
    :label="label"
    :value="label"
    :rules="[{ required:required,validator, message: '这是必填项' }]"
  >
    <template #input>
      <div class="customerUpload width10">
        <van-uploader
          multiple
          :preview-full-image="false"
          v-model="cobyValue"
          :after-read="(file,detail)=>onRead(file)"
        >
          <van-button icon="plus" color="#396dfe" block>点击上传</van-button>
        </van-uploader>
        <div v-for="(box,i) in cobyValue" class="flexBox" :key="i">
          <div class="flex1 flexLeftContent" @click="downloadUpload(box)">{{box.fileName}}</div>
          <div v-if="box.status == 'loading'" class="padding10" @click="deleteUpload(box,i)">
            <van-loading size="16px"></van-loading>
          </div>
          <div class="padding10 flexContent" v-if="!box.status" @click="deleteUpload(box,i)">
            <van-icon name="close" size="16px" />
          </div>
        </div>
      </div>
      <van-overlay :show="showOverlay" z-index="999">
        <div class="wrapper" @click.stop>
          <van-loading size="24px" type="spinner" color="#fff" vertical>上传文件中...</van-loading>
        </div>
      </van-overlay>
    </template>
  </van-field>
</template>
<script>
import { checkArray, checkArrayString, uuid } from '@/utils/index'
import moment from 'moment'
import { Toast } from 'vant'
import service from '@/utils/request'
export default {
  name: 'publicUpload',
  components: {},
  props: {
    value: {
      type: Array,
      default() {
        return []
      },
    },
    required: {
      type: Boolean,
      default: true,
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    label: {
      type: String,
      default: '表单分类',
    },

    uploadService: {
      type: String,
      default:
        process.env.VUE_APP_UPLOADFILE_URL +
        `api/services/app/CommonFile/UploadFileCommon`,
    },
  },
  data() {
    return {
      showOverlay: false,
      cobyValue: [],
    }
  },
  watch: {
    value(to) {
      this.init()
    },
  },
  created() {
    this.init()
  },
  methods: {
    validator(value) {
      let type = true
      if (this.required) {
        type = checkArray(this.value) ? true : false
      }
      return type
    },
    init() {
      this.cobyValue = this.$lodash.cloneDeep(this.value)
    },
    downloadUpload(value) {
      if (value.status) {
        return false
      }
      window.open(
        process.env.VUE_APP_UPLOADFILE_URL +
          'api/TokenAuth/DownloadTempFile?fileType=' +
          value.fileType +
          '&fileToken=' +
          value.guid +
          '&fileName=' +
          value.fileName +
          '&filePath=' +
          value.filePath
      )
    },

    //上传框的delete
    deleteUpload(value, index) {
      //type 0 添加  1删除
      this.$emit('selectComplete', { type: 1, index: index, value: value })
    },

    //上传文件流成功之后
    onRead(file) {
      this.showOverlay = true
      const items = checkArray(file) ? file : [file]
      items.forEach((item) => {
        item.status = 'loading'
        item.fileName = item.file.name
        item.uuid = uuid()
        let fd = new FormData()
        fd.append('file', item.file)
        service.post(this.uploadService, fd).then(
          (data) => {
            Object.keys(data).forEach((key) => {
              item[key] = data[key]
            })
            //type 0 添加  1删除
            this.$emit('selectComplete', { type: 0, index: -1, value: data })
            item.status = null
            this.showOverlay = false
          },
          (err) => {
            this.showOverlay = false
            Toast({
              message: item.fileName + ' 上传失败',
              position: 'middle',
              duration: 3000,
            })
            const i = checkArrayString(this.cobyValue, 'uuid', item.uuid)
            this.cobyValue.splice(i, 1)
          }
        )
      })
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