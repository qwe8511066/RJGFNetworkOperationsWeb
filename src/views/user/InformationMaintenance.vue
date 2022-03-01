<template>
  <div>
    <div class="header">
      <p class="title">用户信息维护</p>
    </div>
    <div class="content">
      <van-form ref="myForm" @submit="onSubmit">
        <div :class="[updateType === 0 ? 'pointerEvents' : '']">
          <div class="title-1-0">基础信息</div>
          <van-field
            v-model="user.name"
            name="姓　　名"
            label="姓　　名"
            placeholder="姓　　名"
            :rules="[{ required: true, message: '请填写姓名' }]"
          />

          <van-field
            v-model="user.phone"
            required
            label="手机号"
            placeholder="请输入手机号"
            :rules="[{ required: true, message: '请填写手机号' }]"
          />

          <div class="title-1-0">业务信息</div>
          <van-field
            v-model="user.professional"
            name="所属专业"
            label="所属专业"
            placeholder="所属专业"
            :rules="[{ required: true, message: '请填写所属专业' }]"
          />

          <van-field
            v-model="user.branch"
            name="分公司类别"
            label="分公司类别"
            placeholder="分公司类别"
            :rules="[{ required: true, message: '请填写分公司类别' }]"
          />

          <van-field
            v-model="user.regionalCategory"
            name="区域类别"
            label="区域类别"
            placeholder="区域类别"
            :rules="[{ required: true, message: '请填写区域类别' }]"
          />

          <van-field
            v-model="user.theGridCategory"
            name="网格类别"
            label="网格类别"
            placeholder="网格类别"
            :rules="[{ required: true, message: '请填写网格类别' }]"
          />
        </div>
     

      <div class="button-wrap">
        <div class="flexBox" v-if="updateType == 0">
          <div class="flex1 marginRight20">

            <!-- 默认第一个按钮提交表单 -->
            <van-button size="large" v-show="false" native-type="button" @click="saveUpdateType"  
              ></van-button
            >

            <van-button
              size="large"
              native-type="button"
              @click="saveUpdateType"
              type="info"
              >修改信息</van-button
            >
          </div>
          <div class="flex1">
            <van-button
              size="large"
              native-type="button"
              :loading="logoutUserLoading"
              @click="logoutUser"
              type="error"
              >注销用户</van-button
            >
          </div>
        </div>

        <div class="flexBox" v-if="updateType == 1">
          <div class="flex1 marginRight20">
            <van-button
              size="large"
              native-type="submit"
              :loading="loading"
              @click="saveUpdate" 
              type="error"
              >确认修改</van-button
            >
          </div>
          <div class="flex1">
            <van-button size="large" native-type="button" @click="noUpdateType" type="info"
              >返回</van-button
            >
          </div>
        </div>
      </div>

       </van-form>

    </div>
  </div>
</template>
<script>
import service from "@/utils/request";
import lodash from "lodash";
export default {
  name: "InformationMaintenance",
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
      cobyUser: null,
      //0不允许修改
      updateType: 0,
      loading: false,
      logoutUserLoading: false
    };
  },
  methods: {
    async saveUpdateType() {
      this.cobyUser = lodash.cloneDeep(this.user);
      this.updateType = 1;
    },

    async noUpdateType() {
      this.user = lodash.cloneDeep(this.cobyUser);
      this.updateType = 0;
    },
    //注销用户
    async logoutUser() {
      this.$dialog
        .confirm({
          title: "提示",
          message: "是否注销用户"
        })
        .then(() => {
          this.$store.dispatch("user/logout");
        })
        .catch(() => {
          // on cancel
        });
    },
    //确定修改
    saveUpdate() {
      // this.$refs.myForm.validate();
      this.$refs.myForm.validate()
    },
    onSubmit() {
      alert("111");
      console.log("1111");
    }
    // async onSubmit(value) {
    //   this.loading = true;
    //   const item = {
    //     usernameOrEmailAddress: this.usernameOrEmailAddress,
    //     password: this.password
    //   };
    //   //登录成功后 请求用户角色
    //   service.post("/user/login", item).then(
    //     data => {
    //       setToken(data.message);
    //       // this.$store.dispatch("user/setToken", data.message);
    //       this.loading = false;
    //       this.$router.push("/informationMaintenance");
    //     },
    //     err => {
    //       this.loading = false;
    //     }
    //   );
    // }
  },
  computed: {}
};
</script>
<style lang="scss" scoped></style>
