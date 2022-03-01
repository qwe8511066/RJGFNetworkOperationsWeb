<template>
  <div>
    <div class="content marginBottom30">
      <van-form ref="myForm" class="myForm" @submit="onSubmit">
        <div>
          <div class="title-1-1">基础信息</div>
          <div class="paddingLeft16 paddingRight16">
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
          </div>

          <div class="title-1-1">故障说明：</div>
          <van-field
            type="textarea"
            v-model="user.professional"
            name="故障说明"
            rows="4"
            :autosize="ture"
            placeholder="故障说明"
            :rules="[{ required: true, message: '请填写故障说明' }]"
          />
        </div>
        <div class="">
          <van-uploader class="myUploader" v-model="fileList" multiple>
            <van-button type="primary">拍照上传</van-button>
          </van-uploader>
        </div>

        <div class="button-wrap">
          <van-button
            size="large"
            native-type="submit"
            :loading="loading"
            type="info"
            >提交回单</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>
<script>
//故障工单处理
import service from "@/utils/request";
import lodash from "lodash";
export default {
  name: "FaultRepairOrderDispose",
  data() {
    return {
      user: {
        name: "王校玉",
        phone: "18260951741",
        professional: "铁塔代维",
        branch: "深圳分公司",
        regionalCategory: "深圳铁塔维护项目部",
        theGridCategory: "新桥网格",
        sms: "123456",
      },
      loading: false,
      fileList: [],
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
    },
  },
  computed: {},
};
</script>
<style lang="scss" scoped></style>
