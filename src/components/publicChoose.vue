
<template>
  <div class="height100">
    <van-search
      v-if="isSearch"
      v-model="page.filterText"
      :placeholder="inputPlaceholder"
      input-align="center"
      debounce="500"
      @clear="query"
      v-debounce="query"
    />
    <van-loading v-if="queryLoading" class="textCenter" size="24px">加载中...</van-loading>
    <van-pull-refresh v-if="!queryLoading" v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getList">
        <van-checkbox-group v-model="checkResult" v-if="!isOneSelect">
          <van-cell-group>
            <van-cell
              v-for="(item, index) in data"
              clickable
              :key="index"
              @click="toggle(item,index,$event)"
            >
              <van-field
                class="fieldNoBg"
                v-for="(box, i) in column"
                :key="i"
                :label="box.label"
                :value="getMultistageFn(item,box.value)"
                readonly
              />
              <template #right-icon>
                <van-checkbox
                  shape="square"
                  :name="String(getMultistageFn(item,checkboxAttribute.dataType))"
                  ref="checkboxes"
                />
              </template>
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>

        <van-radio-group v-model="radioValue" v-if="isOneSelect">
          <van-cell
            v-for="(item, index) in data"
            clickable
            :key="index"
            @click="toggle(item,index,$event)"
          >
            <van-field
              class="fieldNoBg"
              v-for="(box, i) in column"
              :key="i"
              :label="box.label"
              :value="getMultistageFn(item,box.value)"
              readonly
            />
            <template #right-icon>
              <van-radio :name="String(getMultistageFn(item,checkboxAttribute.dataType))"></van-radio>
            </template>
          </van-cell>
        </van-radio-group>
      </van-list>
    </van-pull-refresh>

    <van-tabbar class="myButtonList" route :placeholder="true" :safe-area-inset-bottom="true">
      <div class="flex1 flexContent">
        <div class="myButtonContent">
          <van-button @click="close(false)">取消</van-button>
          <van-button @click="close(true)">确定</van-button>
        </div>
      </div>
    </van-tabbar>
  </div>
</template>
 
<script>
import {
  checkArray,
  checkArrayString,
  removeComma,
  getMultistage,
} from '@/utils/index'
import service from '@/utils/request'
export default {
  name: 'publicChoose',
  props: {
    isSearch: {
      type: Boolean,
      default: true,
    },

    //单选还是多选
    isOneSelect: {
      type: Boolean,
      default: false,
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
  data() {
    return {
      radioValue: null,

      checkboxAttributeValue: [],

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
    if (checkArray(this.checkboxAttribute.value)) {
      this.checkboxAttributeValue = JSON.parse(
        JSON.stringify(this.checkboxAttribute.value)
      )
      if (!this.isOneSelect) {
        this.checkboxAttributeValue.forEach((item) => {
          this.checkResult.push(
            String(getMultistage(item, this.checkboxAttribute.type))
          )
        })
      } else {
        this.checkboxAttributeValue.forEach((item) => {
          this.radioValue = String(
            getMultistage(item, this.checkboxAttribute.type)
          )
        })
      }
    }
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
          data.items.forEach((element) => {
            this.data.push(element)
          })
          if (this.data.length >= data.totalCount) {
            this.finished = true
          }
          //返回列表对象
          this.$emit('onGetList', { list: this.data })
        })
        .catch((err) => console.log(err))
    },

    toggle(value, index, event) {
      if (!this.isOneSelect) {
        const e = this.$refs.checkboxes[index]
        if (!e.checked) {
          value[this.checkboxAttribute.type] = value[
            this.checkboxAttribute.type
          ]
            ? value[this.checkboxAttribute.type]
            : value[this.checkboxAttribute.dataType]
          this.checkboxAttributeValue.push(value)
        } else {
          const i = checkArrayString(
            this.checkboxAttributeValue,
            this.checkboxAttribute.type,
            getMultistage(value, this.checkboxAttribute.dataType)
          )
          this.checkboxAttributeValue.splice(i, 1)
        }
        e.toggle()
      } else {
        this.radioValue = String(
          getMultistage(value, this.checkboxAttribute.dataType)
        )
        this.checkboxAttributeValue = [value]
      }
    },

    close(type) {
      this.$emit('close', { type: type, value: this.checkboxAttributeValue })
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