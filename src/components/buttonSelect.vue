  <template>
  <div>
    <div @click="clickSelect()">{{text}}</div>
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
  </div>
</template>
<script>
import { checkArray, checkArrayString } from '@/utils/index'
export default {
  name: 'buttonSelect',
  props: {
    value: {},
    selectList: {
      type: Array,
      default() {
        return []
      },
    },

    text: {
      type: String,
      default: '操作',
    },

    type: {
      type: String,
      default: 'id',
    },

    checkValue: {
      type: String,
      default: 'text',
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
      const index = checkArrayString(
        this.selectList,
        this.type,
        String(this.value)
      )
      this.valueName =
        index != -1 ? this.selectList[index][this.checkValue] : ''
      this.selectIndex = index != -1 ? index : 0
    },
    clickSelect(e, item) {
      this.showSelect = true
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
