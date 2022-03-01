
<template>
  <div class="loading">
    <van-loading size="24px" type="spinner" color="#fff" vertical>加载中...</van-loading>
  </div>
</template>
 
<script>
export default {
  name: "LOADING",
  data() {
    return {};
  }
};
</script>
<style scoped>
.loading {
  width: 100%;
  height: 100%;
  background: rgb(0, 0, 0, 0.7);
  justify-content: center;
  align-items: center;
  display: flex;
  z-index: 111;
}
.van-loading__text {
  color: #fff;
}
</style>