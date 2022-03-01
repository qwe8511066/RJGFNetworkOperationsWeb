
<template>
  <div>
    <van-form ref="customerNewForm" class="customerNewForm">
      <van-field name="radio" label="类型">
        <template #input>
          <van-radio-group v-model="newForm.approverRadioValue" direction="horizontal">
            <van-radio
              :name="item.value"
              v-for="(item,index) in approverRadioValueSelect"
              :key="index"
            >{{ item.label }}</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-field label="添加审批人" @click="clickChoice()">
        <template #input>
          <div class="customerTags">
            <van-tag
              v-for="(box,i) in checkboxAttribute.value"
              :key="i"
              closeable
              size="medium"
              type="primary"
              @close="closeTag(box,i)"
            >{{box.realName}}</van-tag>
          </div>
        </template>
      </van-field>

      <van-field
        rows="2"
        type="textarea"
        required
        autosize
        v-model="newForm.details"
        label="审核意见"
        placeholder="请输入审核意见"
        :rules="[{ required: true, message: '这是必填项' }]"
      ></van-field>
    </van-form>
    <van-popup
      get-container="body"
      v-model="showChoice"
      :overlay="showChoice"
      v-if="showChoice"
      :close-on-click-overlay="false"
      position="bottom"
    >
      <public-choose
        @close="closeChoice"
        :checkboxAttribute.sync="checkboxAttribute"
        :column.sync="column"
        :listServe="listServe"
      ></public-choose>
    </van-popup>
  </div>
</template>
 
<script>
import publicChoose from './publicChoose'
export default {
  name: 'publicCustomerLeftFrom',
  components: {
    publicChoose,
  },
  data() {
    return {
      approverRadioValueSelect: this.$PublicEnumeration
        .approverRadioValueSelect,

      newForm: {
        approverRadioValue: 5,
        details: '',
      },

      checkboxAttribute: {
        type: 'value',
        value: [],
        dataType: 'id',
      },
      column: [
        {
          label: '人员姓名',
          value: 'realName',
        },
      ],
      listServe: '/api/services/app/BaseUser/CommonSelectUsersByPage',
      showChoice: false,
    }
  },
  created() {},
  methods: {
    closeTag(value, index) {
      console.log(value, index)
    },
    clickChoice() {
      this.showChoice = true
    },
    closeChoice() {
      this.showChoice = false
    },
  },
}
</script>
<style scoped>
</style>