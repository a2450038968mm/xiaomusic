<template>
  <div class="body">
    <van-popup
      v-model="showlist"
      round
      position="bottom"
      :style="{ height: '529px' }"
      overlay-class="mask"
      :close-on-click-overlay="fig"
      @click-overlay="close"
    >
      <div class="title">
        <span :class="['iconfont', {'icon-M_xunhuan':playtype==1},{'icon-icon-':playtype==2},{'icon-hanhan-01-01':playtype==3}]"></span>
        <div class="shunxu" >
          {{playtype==1?"顺序播放":playtype==2?"随机播放":"单曲循环"}}（{{ playlists.length }}）
        </div>
        <span class="iconfont icon-shanchu11" @click="clearplaylist" @mouseup="close"></span>
      </div>
      <div class="list">
        <ul>
          <li v-for="(item, key) in playlists" :key="key" @click="amendindex(key)">
            <span class="iconfont icon-laba" v-show="playindex == key"></span>
            <div class="name">{{ item.name }}</div>
            <span class="iconfont icon-shanchu1" @click.stop="delplaylist(key)"></span>
          </li>
        </ul>

      </div>
      <div class="close" @click.stop="close">
        关闭
      </div>
    </van-popup>
  </div>
</template>

<script>
import {mapState,mapActions} from "vuex"
export default {
  data() {
    return {
      fig:false,
    };
  },
  props: ["musicdata", "showlist","playtype"],
  computed:{
    ...mapState(["playlists","playindex"])
  },
  methods: {
    ...mapActions(["delplaylist","amendindex","clearplaylist"]),
    // 关闭
    close(){
      this.$emit("exitlist-com")
    },
  },
};
</script>

<style lang="less" scoped>
.body{
  font-size: 24px;
}
.close{
  width: 100%;
  text-align: center;
  padding-bottom: 27px;
  
}
.title {
  margin: 30px 30px 0 30px;
  display: flex;
  span {
    display: block;
    flex: 0 0 39px;
    font-size: 22px;
  }
  .shunxu {
    flex: 1;
  }
}
.list {
  margin: 0 30px;
  ul li {
    display: flex;
    margin-top: 27px;
    margin-bottom: 40px;
    span {
      display: block;
      flex: 0 0 39px;
      font-size: 22px;
      color: #d4483d;
    }
    .name {
      flex: 1;
    }
  }
}
</style>