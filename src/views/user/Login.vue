<template>
  <div>
    <div class="header">
      <p class="title">用户注册</p>
    </div>
    <div class="content">
      <van-form @submit="onSubmit" class="myForm">
        <div class="title-1-0">基础信息</div>
        <van-field
          v-model="user.name"
          name="姓　　名"
          label="姓　　名:"
          placeholder="姓　　名"
          :rules="[{ required: true, message: '请填写姓名' }]"
        />

        <van-field
          v-model="user.phone"
          required
          label="手机号:"
          placeholder="请输入手机号"
          :rules="[{ required: true, message: '请填写手机号' }]"
        />

        <div class="title-1-0">业务信息</div>
        <van-field
          v-model="user.professional"
          name="所属专业"
          label="所属专业:"
          placeholder="所属专业"
          :rules="[{ required: true, message: '请填写所属专业' }]"
        />

        <van-field
          v-model="user.branch"
          name="分公司类别"
          label="分公司类别:"
          placeholder="分公司类别"
          :rules="[{ required: true, message: '请填写分公司类别' }]"
        />

        <van-field
          v-model="user.regionalCategory"
          name="区域类别"
          label="区域类别:"
          placeholder="区域类别"
          :rules="[{ required: true, message: '请填写区域类别' }]"
        />

        <van-field
          v-model="user.theGridCategory"
          name="网格类别"
          label="网格类别:"
          placeholder="网格类别"
          :rules="[{ required: true, message: '请填写网格类别' }]"
        />

        <van-field
          v-model="user.sms"
          center
          clearable
          label="验证码:"
          placeholder="请输入验证码"
          :rules="[{ required: true, message: '请填写验证码' }]"
        >
          <template #button>
            <van-button size="small" type="primary">获取验证码</van-button>
          </template>
        </van-field>

        <div class="button-wrap">
          <van-button
            size="large"
            native-type="submit"
            :loading="loading"
            type="info"
            >确认注册</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>
<script>
//用户注册
import { setToken } from "@/utils/auth";
import service from "@/utils/request";
export default {
  name: "Login",
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
      passwordType: "password",
      loading: false,
    };
  },
  methods: {
    async onSubmit(value) {
      this.loading = true;
      const item = {
        usernameOrEmailAddress: this.usernameOrEmailAddress,
        password: this.password,
      };
      //登录成功后 请求用户角色
      service.post("/user/login", item).then(
        (data) => {
          setToken(data.message);
          // this.$store.dispatch("user/setToken", data.message);
          this.loading = false;
          this.$router.push("/informationMaintenance");
        },
        (err) => {
          this.loading = false;
        }
      );
    },
    switchPasswordType() {
      this.passwordType =
        this.passwordType === "password" ? "text" : "password";
    },
  },
  computed: {
    passwordIcon: function () {
      return this.passwordType === "password" ? "closed-eye" : "eye";
    },
  },
};
</script>
<style lang="scss" scoped></style>
