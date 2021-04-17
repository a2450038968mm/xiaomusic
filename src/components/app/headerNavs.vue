<template>
  <div>
    <div class="navcon">
      <div v-if="open" class="header">
        <div class="left">
          <!-- <span class="iconfont icon-caidan" ></span> -->
          <router-link
            to="/user"
            tag="span"
            class="iconfont icon-caidan"
          ></router-link>
        </div>
        <div class="mid">xiao音乐</div>
        <div class="right">
          <span class="iconfont icon-sousuo" @click="sousuo"></span>
        </div>
      </div>
      <div class="navs">
        <router-link to="/recommend" tag="div" class="item">
          <span>推荐</span>
        </router-link>
        <router-link to="/rank" tag="div" class="item">
          <span>排行</span>
        </router-link>
        <router-link to="/singer" tag="div" class="item">
          <span>歌手</span>
        </router-link>
        <router-link to="/mvlist" tag="div" class="item">
          <span>mv</span>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      open: true,
    };
  },
  methods: {
    sousuo() {
      this.$router.push({ path: "/search" });
    },
  },
};
</script>
<style lang="less" scoped>
.navcon {
  position: sticky;
  top: 0px;
}
.header {
  background: #d4473c;
  color: #fff;
  width: 100%;
  display: flex;
  height: 63.0016px;
  line-height: 63.0016px;
  text-align: center;
  .left {
    flex: 0 0 98.0032px;
    .icon-caidan {
      font-size: 30px;
    }
  }
  .mid {
    font-size: 30px;
    flex: 1;
  }
  .right {
    .icon-sousuo {
      font-size: 30px;
    }
    flex: 0 0 98.0032px;
  }
}
.navs {
  margin-top: -1px;
  width: 100%;
  background: #d4473c;
  display: flex;
  height: 72.9984px;
  line-height: 72.9984px;
  color: #fff;
  text-align: center;
  font-size: 30px;
  .item {
    flex: 1;
    span {
      margin-top: 23px;
      height: 33px;
      line-height: 33px;
      display: inline-block;
      border-bottom: 2px solid transparent;
    }
    &.router-link-active span {
      font-weight: bold;
      border-color: #fff;
    }
  }
}
</style>