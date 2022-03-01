<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive :include="cacheViews">
        <router-view />
      </keep-alive>

      <!-- <keep-alive v-if="$route.meta.keepAlive">
        <router-view class="router"></router-view>
      </keep-alive>
      <router-view class="router" v-else></router-view>-->
    </transition>
  </div>
</template>
<script>
import defaultSetting from './settings'
export default {
  name: 'app',
  computed: {
    cacheViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.name
    },
    transitionName() {
      if (defaultSetting.needPageTrans) {
        return this.$store.state.direction
      }
      return ''
    },
  },
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  position: relative;
}

.router {
  width: 100%;
  height: 100%;
  position: absolute;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  // background-color: #fff;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 0.5s;
  position: absolute;
  width: 100%;
  left: 0;
}
.slide-right-enter {
  transform: translateX(-100%);
}
.slide-right-leave-active {
  transform: translateX(100%);
}
.slide-left-enter {
  transform: translateX(100%);
}
.slide-left-leave-active {
  transform: translateX(-100%);
}
</style>
