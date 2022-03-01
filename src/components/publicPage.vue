
<template>
  <div class="loading navigationContent">
    <div class="top" :fixed="true">
      <van-search
        v-if="isSearch"
        v-model="page.filterText"
        :placeholder="inputPlaceholder"
        input-align="center"
        debounce="500"
        @clear="query"
        v-debounce="query"
      />
      <slot name="hreadFormItem"></slot>
    </div>
    <slot name="header"></slot>
    <van-loading v-if="queryLoading" class="textCenter" size="24px">加载中...</van-loading>
    <van-pull-refresh v-if="!queryLoading" v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getList">
        <slot name="item" :data="data"></slot>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
 
<script>
import { getMultistage } from '@/utils/index'
import service from '@/utils/request'
import { Toast } from 'vant'

export default {
  name: 'publicPage',
  props: {
    isSearch: {
      type: Boolean,
      default: true,
    },
    myPages: {
      type: Object,
      default: function () {
        return {}
      },
    },
    inputPlaceholder: {
      type: String,
      default: '请输入搜索的关键字',
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
    columnsType: {
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

          //默认值   外部传默认值进来
          value: [],

          //列表的值
          dataType: 'id',
        }
      },
    },
  },

  watch: {
    myPages(to, form) {
      this.query()
    },
  },

  data() {
    return {
      //已选的列表进行转换
      checkResult: [],

      // 传给后台的分页
      page: {
        // 当前页面
        page: 1,
        // 每页条数
        maxResultCount: 10,

        filterText: '',
      },
      data: [],
      loading: false,
      queryLoading: false,
      finished: false,
      refreshing: false,
    }
  },

  created() {
    if (!this.listServe) {
      this.close(false)
      throw new Error('没有传入接口')
      return false
    }
    this.checkboxAttribute.value.forEach((item) => {
      this.checkResult.push(
        String(getMultistage(item, this.checkboxAttribute.type))
      )
    })

    // this.getList()
  },

  methods: {
    //点击搜索
    query(e) {
      this.data = []
      this.queryLoading = true
      this.page.page = 1
      this.getList()
    },

    onRefresh() {
      this.finished = false
      this.query()
    },

    //获取列表数据
    getList() {
      this.page = Object.assign({}, this.page, this.myPages)
      this.loading = true
      service
        .post(this.listServe, this.page)
        .then((data) => {
          this.page.page++
          this.loading = false
          this.queryLoading = false
          const value = data && data.items ? data.items : data.data
          let total = data && data.total ? data.total : data.totalCount
          total = total ? total : 0
          value.forEach((element) => {
            this.data.push(element)
          })
          if (this.data.length >= total) {
            this.finished = true
          }
          //返回列表对象
          this.$emit('onGetList', { list: this.data })
        })
        .catch((err) => console.log(err))
    },

    toggle(value, index) {
      const e = this.$refs.checkboxes[index]
      if (!e.checked) {
        this.checkboxAttribute.value.push(value)
      } else {
        this.checkboxAttribute.value.splice(index, 1)
      }
      e.toggle()
    },

    close(type) {
      this.$emit('close', type)
    },
    getMultistageFn(data, index) {
      const value = getMultistage(data, index)
      return typeof value == 'object' ? '' : value
    },
  },
}
</script>
<style scoped>
.fieldNoBg {
  background: none;
}
</style>