<template>
  <div class="height-full flex flexCloumn">
    <van-nav-bar
      left-arrow
      @click-left="back"
      :title="this.$store.getters.user.applicationTitle"
      :fixed="true"
      :placeholder="true"
    />
    <div class="flexMain  flex flexCloumn">
      <div class="padding10">
        <van-search
          v-if="activeName == '0'"
          v-model="myPages.filterText"
          placeholder="等级"
          input-align="center"
          debounce="500"
          @clear="topNQuery"
          v-debounce="topNQuery"
        />

        <van-search
          v-if="activeName == '1'"
          v-model="myPages.filterText"
          placeholder="派单时间"
          input-align="center"
          debounce="500"
          @clear="sendOrdersQuery"
          v-debounce="sendOrdersQuery"
        />
      </div>
      <div class="flexMain">
      <van-tabs class="tabs-1-0" :line-width="'50%'" v-model="activeName" :lazy-render="false">
        <van-tab title="TOP-N等级" name="0">
          <div>
            <div v-for="i in 100" :key="i">
              <h1>{{i}}</h1>
            </div>
            <!-- <public-page
              ref="publicPage1"
              :listServe="'/list'"
              :myPages.sync="myPages"
              :isSearch="false"
              ><template slot="item" slot-scope="scope">
                <div v-for="(item, index) in scope.data" :key="index">
                  <div @click="topNClick(item, index)">
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
                </div>
              </template>
            </public-page> -->
          </div>
        </van-tab>
        <van-tab title="派单时间" name="1">
          <div>
            222
            <!-- <public-page
              ref="publicPage2"
              :listServe="'/list'"
              :myPages.sync="myPages"
              :isSearch="false"
              ><template slot="item" slot-scope="scope">
                <div v-for="(item, index) in scope.data" :key="index">
                  <div @click="sendOrdersClick(item, index)">
                    <p>序号：</p>
                    <p>区县：</p>
                    <p>网格：</p>
                    <p>班组人员：</p>
                    <p>站址名称：</p>
                    <p>站址编码：</p>
                    <p>故障原因：</p>
                    <p>基站等级：</p>
                    <p>权重值：</p>
                    <p>派单时间：</p>
                  </div>
                </div>
              </template>
            </public-page> -->
          </div>
        </van-tab>
      </van-tabs>
      </div>
    </div>
  </div>
</template>
<script>
//故障工单
import service from "@/utils/request";
import lodash from "lodash";
import publicJs from "@/extends/public";
import publicPage from "@/components/publicPage";
export default {
  name: "FaultRepairOrder",
  mixins: [publicJs],
  components: {
    publicPage
  },
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
      myPages: {},
      loading: false,
      fileList: [],
      activeName: "0"
    };
  },
  methods: {
    async topNQuery(value) {
      console.log(value);
      // this.loading = true;
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
    async sendOrdersQuery(value){

    },
    async topNClick(item, index) {
      this.$router.push("/FaultRepairOrderDetails");
    },
    async sendOrdersClick(item, index) {
      this.$router.push("/FaultRepairOrderDetails");
    }
  },
  computed: {}
};
</script>
<style lang="scss" scoped></style>
