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
    v-model="value"
    :rules="[{ required:this.required, message: '这是必填项' }]"
    @click="clickSelect()"
  >
    <template #button>
      <div>
        <van-button size="small" color="#396dfe" v-if="value" @click="emptyClick($event)">清空</van-button>
        <span v-if="!value">选择</span>
      </div>
      <van-popup v-model="showSelect" position="bottom" get-container="body">
        <van-datetime-picker
          :type="type"
          v-model="cobyValue"
          @confirm="selectConfirm"
          @cancel="showSelect = false"
          :min-date="cobyMinDate"
          :max-date="cobyMaxDate"
        />
      </van-popup>
    </template>
  </van-field>
</template>
<script>
import { checkArray, checkArrayString } from '@/utils/index'
import moment from 'moment'
export default {
  name: 'publicDate',
  props: {
    value: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'date',
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

    minDate: {
      type: String,
      default: '',
    },

    maxDate: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      showSelect: false,
      cobyValue: '',
      cobyMinDate: null,
      cobyMaxDate: null,
    }
  },
  watch: {
    maxDate(to, form) {
      this.init()
    },
    minDate(to, form) {
      this.init()
    },
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.cobyValue = this.value
        ? moment(this.$lodash.cloneDeep(this.value))._d
        : new Date()
      this.cobyMinDate = this.minDate
        ? moment(this.$lodash.cloneDeep(this.minDate))._d
        : moment(new Date()).subtract(10, 'years')._d
      this.cobyMaxDate = this.maxDate
        ? moment(this.$lodash.cloneDeep(this.maxDate))._d
        : moment(new Date()).subtract(-10, 'years')._d
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
      this.$emit('selectComplete', '')
    },
  },
}
</script>
