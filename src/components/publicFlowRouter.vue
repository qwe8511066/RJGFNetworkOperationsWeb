<template>
  <van-steps direction="vertical" :active="routeList.length">
    <van-step v-for="(item, index) in routeList" :key="index">
      <strong class="font16">{{item.name}}</strong>
      <p v-if="item.nodeInstruction">节点说明：{{item.nodeInstruction}}</p>
      <div
        v-for="(box, i) in item.editWorkFlow_NodeAuditorRecordDtos"
        :key="i"
        class="editWorkFlow_NodeAuditorRecordDtos"
      >
        <p>审核人：{{box.applyEName}}</p>
        <p v-if="item.timeLimit">
          审核结果
          <span
            class="color52c41a"
            :class="{colorff5959:box.result==0||box.result==2}"
          >{{nodeAuditorResult[box.result]}}</span>
        </p>
        <p v-if="!box.completionTime">待审核时间：{{box.creationTime |momentFilter}}</p>
        <p v-if="box.completionTime">处理时间：{{box.completionTime |momentFilter}}</p>
        <p v-if="box.applyType && applyTypeEnum">类型：{{applyTypeEnum[box.applyType].text}}</p>
        <p>审核部门：{{box.deptFullPath}}</p>
        <span>
          审核意见:
          <span v-html="box.details"></span>
        </span>
        <p v-if="box.newDetails">{{box.newDetails}}</p>
      </div>
    </van-step>
  </van-steps>
</template>

<script>
/**
 * 发起流程和待办流程通用的左侧表单
 */
import service from '@/utils/request'
import { checkArray, checkArrayString } from '@/utils/index'
export default {
  name: 'publicFlowRouter',
  components: {},
  data() {
    return {
      applyTypeEnum: this.$PublicEnumeration.applyTypeEnum,
      nodeAuditorResult: this.$PublicEnumeration.nodeAuditorResult,
      active: 0,
    }
  },
  watch: {},
  props: {
    routeList: {
      type: Array,
      default: () => [],
    },
  },
  created() {
    this.active = this.routeList.length
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.noNumber > span[role='button'] {
  display: none;
}
.routeList .editWorkFlow_NodeAuditorRecordDtos {
  margin-bottom: 40px;
}
.routeList .editWorkFlow_NodeAuditorRecordDtos:last-child {
  margin-bottom: 0;
}
</style>