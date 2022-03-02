<template>
  <div class="height100">
    <van-nav-bar
      left-arrow
      @click-left="back"
      :title="this.$store.getters.user.applicationTitle"
      :fixed="true"
      :placeholder="true"
    />
    <div class="content-body">
      <van-form ref="myForm" class="myForm" @submit="onSubmit">
        <div class="marginBottom20 padding16 bgfff"> 
          <p>序号：</p>
          <p>区县：</p>
          <p>网格：</p>
          <p>班组人员：</p>
          <p>站址名称：</p>
          <p>站址编码：</p>
          <p>故障原因：</p>
          <p>基站等级：</p>
          <p>权重值：</p>
          <p>故障数量：</p>
        </div>

        <div class="title-1-2">移动类工单</div>
        <div class="title-1-1">网优工单</div>
        <div class="marginBottom20 padding16 bgfff"> 
          <p>通报类型：</p>
          <p>基站名：</p>
          <p>小区名：</p>
          <p>告警名称：</p>
          <p>告警时间：</p>
          <p>恢复时间：</p>
          <p>工单处理：</p> 
        </div>

        <div class="title-1-1">无线工单</div>
        <div class="marginBottom20 padding16 bgfff"> 
          <p>告警名称：</p>
          <p>小区名：</p>
          <p>基站名：</p>
          <p>派单时间：</p>
          <p>受理专业：</p>
          <p>恢复时间：</p>
          <p>最新回复内容：</p>
          <p>优化片区：</p> 
          <p>网格组长：</p> 
          <p>工单处理：</p> 
        </div>

        <div class="title-1-1">传输工单</div>
        <div  class="marginBottom20 padding16 bgfff"> 
          <p>工单号：</p>
          <p>工单标题：</p>
          <p>设备维护单位：</p>
          <p>T1升级移交时间：</p>
          <p>是否延期有效：</p>
          <p>是否超时：</p>
          <p>告警对象：</p>
          <p>告警标准名：</p> 
          <p>已派发相同工单数：</p> 
          <p>工单处理：</p> 
        </div>


        <div class="title-1-2">铁塔类工单</div>
        <div class="title-1-1">故障工单</div>
        <div  class="marginBottom20 padding16 bgfff"> 
          <p>处理人/部门：</p>
          <p>处理人电话：</p>
          <p>派单时间：</p>
          <p>时限（分钟）：</p>
          <p>故障设备类型：</p>
          <p>告警状态：</p>
          <p>告警描述：</p> 
          <p>站址运维ID：</p> 
          <p>站址名称：</p> 
          <p>工单历时（分钟）：</p> 
          <p>告警时间：</p> 
          <p>工单处理：</p> 
        </div>

        <div class="title-1-1">巡检工单</div>
        <div  class="marginBottom20 padding16 bgfff"> 
          <p>计划名称：</p>
          <p>专业：</p>
          <p>计划执行时间：</p>
          <p>站址编码：</p>
          <p>站址名称：</p>
          <p>状态：</p>
          <p>工单处理：</p> 
        </div>
        
      </van-form>
    </div>
  </div>
</template>
<script>
//故障工单详情
import service from "@/utils/request";
import lodash from "lodash";
import publicJs from "@/extends/public";
export default {
  name: "FaultRepairOrderDetails",
  mixins: [publicJs],
  data() {
    return {
      user: {
        name: "王校玉",
        phone: "18260951741",
        professional: "铁塔代维",
        branch: "深圳分公司",
        regionalCategory: "深圳铁塔维护项目部",
        theGridCategory: "新桥网格",
        sms: "123456"
      },
      loading: false,
      fileList: []
    };
  },
  methods: {
    async onSubmit(value) {
      this.loading = true;
      //登录成功后 请求用户角色
      // service.post("/user/login", item).then(
      //   data => {
      //     setToken(data.message);
      //     // this.$store.dispatch("user/setToken", data.message);
      //     this.loading = false;
      //     this.$router.push("/informationMaintenance");
      //   },
      //   err => {
      //     this.loading = false;
      //   }
      // );
    }
  },
  computed: {}
};
</script>
<style lang="scss" scoped></style>
