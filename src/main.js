import Vue from 'vue'
import 'lib-flexible'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import 'utils/permission'
import SvgIcon from 'components/SvgIcon'
import '@/icons' // icon
import '@/style/common.scss'
import '@/style/index.scss'
import { Lazyload } from 'vant'
import Vant from 'vant'
import defaultSettings from '@/settings'
import 'vant/lib/index.css';
import vueDebounce from 'vue-debounce'
import moment from 'moment'
import PublicEnumeration from '@/global/PublicEnumeration'
import lodash from 'lodash'
import VueNumericInput from 'vue-numeric-input';
import * as filters from './filters'
import './assets/fonts/iconfont.js'
import 'font-awesome/css/font-awesome.css'
import VueQuillEditor from 'vue-quill-editor'
import VueTouch from 'vue-touch'
import AMap from 'vue-amap';
import Scroll from "@/directive/scroll.js"
import publicComponents from "@/utils/publicComponents.js"
Vue.use(publicComponents);

Vue.use(AMap);

// 初始化vue-amap
AMap.initAMapApiLoader({
  // 高德key
  key: '8e95ceabdb9694eea7cd2d266ec24bdc',
  // 插件集合 （插件按需引入）
  plugin: ['AMap.Geolocation']
});
Vue.use(VueTouch, { name: 'v-touch' });
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor, {
  placeholder: '请输入内容',
})
Vue.use(VueNumericInput)

Vue.prototype.$Scroll = Scroll //滚动
Vue.prototype.$PublicEnumeration = PublicEnumeration //全局枚举库
Vue.prototype.$lodash = lodash
Vue.use(moment)
//input 防抖专用
Vue.use(vueDebounce, {
  defaultTime: '500ms'
})

import { mockXHR } from '../mock'

if (process.env.NODE_ENV === 'development') {
  mockXHR()
}

// options 为可选参数，无则不传
Vue.use(Lazyload)
Vue.use(Vant)
Vue.component('svg-icon', SvgIcon)

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

if (process.env.NODE_ENV === 'development' && defaultSettings.vconsole) {
  const VConsole = require('vconsole')
  // eslint-disable-next-line
  const my_console = new VConsole()
}
// var vConsole = new VConsole(option)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
