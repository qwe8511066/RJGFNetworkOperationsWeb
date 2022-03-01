  <template #button>
  <van-field
    class="myField"
    :required="required"
    readonly
    clickable
    :disabled="disabled"
    :class="{pointerEvents:disabled}"
    name="picker"
    :label="label"
    v-model="valueName"
    :rules="[{ required:this.required, message: '这是必填项' }]"
    @click="clickSelect()"
  >
    <template #button>
      <van-loading size="16px" v-if="loading"></van-loading>
      <div v-if="!loading">
        <van-button size="small" color="#396dfe" v-if="value" @click="emptyClick($event)">清空</van-button>
        <span v-if="!value">选择</span>
      </div>
      <van-popup v-model="showSelect" position="bottom" get-container="body">
        <van-picker
          v-if="selectList && selectList.length>0"
          show-toolbar
          :columns="selectList"
          @confirm="selectConfirm"
          @cancel="showSelect = false"
          :default-index="selectIndex"
        />
      </van-popup>
    </template>
  </van-field>
</template>
<script>
import { checkArray, checkArrayString } from '@/utils/index'
export default {
  name: 'publicSelect',
  props: {
    value: {},
    selectList: {
      type: Array,
      default() {
        return []
      },
    },

    type: {
      type: String,
      default: 'id',
    },

    selectLabel: {
      type: String,
      default: 'text',
    },

    loading: {
      type: Boolean,
      default: false,
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
  },
  data() {
    return {
      showSelect: false,
      selectIndex: 0,
      valueName: '',
    }
  },
  watch: {
    value(to, form) {
      this.init()
    },
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      if (checkArray(this.selectList)) {
        this.selectList.forEach((item) => {
          item.text = item.text ? item.text : item[this.selectLabel]
        })
      }
      const index = checkArrayString(
        this.selectList,
        this.type,
        String(this.value)
      )
      this.valueName =
        index != -1 ? this.selectList[index][this.selectLabel] : ''
      this.selectIndex = index != -1 ? index : 0
    },
    clickSelect(e, item) {
      if (!this.loading) {
        this.showSelect = true
      }
    },

    selectConfirm(value) {
      this.showSelect = false
      this.$emit('selectComplete', value)
    },

    emptyClick(e) {
      e.stopPropagation()
      this.showSelect = false
      const value = {}
      value[this.type] = null
      this.$emit('selectComplete', value)
    },
  },
}
</script>
