<template>
  <div id="app">
    <div class="main">
    <headerNavs class="headerTop" v-if="!$route.meta.isopen"></headerNavs>
    <router-view class="aa"></router-view>
    <play></play>

    </div>
  </div>
</template>

<script>
import headerNavs from "./components/app/headerNavs"
import play from "./components/app/play"
export default {
  data() {
    return {
      open:true,
      isopen:true,
      show:true,
      openlist:false
    }
  },
  methods:{
  },
  components:{
    headerNavs,
    play,
  },
 
}
</script>
<style lang="less" scoped>
  .aa{
    margin-top: -1px;
    width: 100%;
    position: relative;
  }
</style>
