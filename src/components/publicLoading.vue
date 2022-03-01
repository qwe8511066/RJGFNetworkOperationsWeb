  <template #button>
  <van-popup
    v-model="value"
    v-if="value"
    class="loadingPopup"
    :close-on-click-overlay="false"
    position="bottom"
  >
    <div class="wrapper" @click.stop>
      <van-loading size="24px" type="spinner" color="#fff" vertical></van-loading>
    </div>
  </van-popup>
</template>
<script>
import { checkArray, checkArrayString } from '@/utils/index'
export default {
  name: 'publicLoading',
  props: {
    value: {
      type: Boolean,
    },
  },
  data() {
    return {}
  },
  created() {},
  methods: {},
}
</script>
<style scoped>
.loadingPopup {
  background: none;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  height: 100vh;
}
</style>
