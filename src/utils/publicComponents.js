import publicPage from "@/components/publicPage";
// 这里是重点
const publicComponents = {
  install: function (Vue) {
    Vue.component('publicPage', publicPage)
  }
}

// 导出组件
export default publicComponents
