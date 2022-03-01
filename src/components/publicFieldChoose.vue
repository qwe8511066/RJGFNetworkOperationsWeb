  <template #button>
  <van-field
    class="myField"
    :required="required"
    :disabled="disabled"
    :class="{pointerEvents:disabled}"
    :label="label"
    :value="label"
    :rules="[{ required:required,validator, message: '这是必填项' }]"
    @click="clickSelect()"
  >
    <template #input>
      <div class="customerTags">
        <van-tag
          v-for="(box,i) in cobyValue"
          :key="i"
          closeable
          size="medium"
          type="primary"
          @close="closeTag(i)"
        >{{box[tagLabel]}}</van-tag>
      </div>
    </template>

    <template #button>
      <div>
        <span v-if="value.length == 0">选择</span>
      </div>
      <van-popup
        get-container="body"
        v-model="showChoose"
        :overlay="showChoose"
        v-if="showChoose"
        :close-on-click-overlay="false"
        position="bottom"
      >
        <public-choose
          @close="selectConfirm"
          :checkboxAttribute.sync="checkboxAttribute"
          :column.sync="column"
          :listServe="listServe"
        ></public-choose>
      </van-popup>
    </template>
  </van-field>
</template>
<script>
import { checkArray, checkArrayString } from '@/utils/index'
import moment from 'moment'
import publicChoose from '@/components/publicChoose'
export default {
  name: 'publicFieldChoose',
  components: { publicChoose },
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

    //列表请求的url
    listServe: {
      type: String,
      default: '',
    },

    column: {
      type: Array,
      default() {
        return []
      },
    },

    //多选属性
    checkboxAttribute: {
      type: Object,
      default: function () {
        return {
          //判断的属性
          type: 'id',

          //列表的值
          dataType: 'id',
        }
      },
    },

    tagLabel: {
      type: String,
      default: 'label',
    },
  },
  data() {
    return {
      showChoose: false,
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
      return this.required && checkArray(this.value) ? true : false
    },
    init() {
      this.cobyValue = this.$lodash.cloneDeep(this.value)
      this.checkboxAttribute.value = this.cobyValue
    },
    clickSelect(e, item) {
      this.showChoose = true
      console.log(this.checkboxAttribute.value)
    },
    selectConfirm(value) {
      this.showChoose = false
      if (value.type) {
        this.$emit('selectComplete', value)
      }
    },
    emptyClick(e) {
      e.stopPropagation()
      this.showChoose = false
      this.$refs.addScheduled
      this.$emit('selectComplete', [])
    },
    closeTag(index) {
      this.cobyValue.splice(index, 1)
      this.$emit('selectComplete', { value: this.cobyValue })
    },
  },
}
</script>
