<template>
  <div>
    <div class="content marginBottom30">
      <van-form ref="myForm" class="myForm" @submit="onSubmit">
        <div>
          <div class="title-1-1">基站名称</div>
          <van-field
            v-model="user.name"
            name="基站名称"
            label="基站名称:"
            placeholder="基站名称"
            :rules="[{ required: true, message: '请填写基站名称' }]"
          />

          <van-field
            v-model="user.professional"
            name="专业类型"
            label="专业类型:"
            placeholder="专业类型"
            :rules="[{ required: true, message: '请填写专业类型' }]"
          />

          <van-field
            v-model="user.professional"
            name="隐患类型"
            label="隐患类型:"
            placeholder="隐患类型"
            :rules="[{ required: true, message: '请填写隐患类型' }]"
          />

          <div class="title-1-1">隐患说明:</div>
          <van-field
            type="textarea"
            v-model="user.professional"
            name="隐患说明"
            rows="4"
            :autosize="ture"
            placeholder="隐患说明"
            :rules="[{ required: true, message: '请填写隐患说明' }]"
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
            >提交</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>
<script>
//故障上报
import service from "@/utils/request";
import lodash from "lodash";
export default {
  name: "HiddenTroubleReport",
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
