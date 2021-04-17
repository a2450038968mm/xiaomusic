<template>
  <div>
    <ul ref="ul">
      <li
        v-for="(item, index) in mvlist"
        :key="index"
        @click="playmv(index, item.id)"
      >
      <div class="play" v-show="mvnum != index">
        <span class="iconfont icon-bofang"></span>
      </div>
        <div class="img" v-show="mvnum != index">
          <img :src="item.cover" alt="" />
        </div>
        <video v-if="mvnum == index" autoplay :src="mvurl" @click.stop="stop"></video>
        <div class="title">
          {{item.name}}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getMvlist, getMvurl } from "../api/getmv";
export default {
  data() {
    return {
      mvlist: [],
      offset: 0,
      mvurl: null,
      mvnum: null,
    };
  },
  methods: {
    getmvdata() {
      getMvlist({ limit: 5, offset: this.offset }).then((data) => {
        this.mvlist = data.data;
      });
    },
    stop(){
      this.mvurl=null
      this.mvnum=null
    },
    handScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop; //滚动条偏移量
      if(this.$refs.ul){
        let lis = this.$refs.ul.getElementsByTagName("li");
        let num = lis.length - 2;
        if (lis[num].offsetTop < scrollTop) {
          this.offset += 1;
          getMvlist({ limit: 5, offset: this.offset }).then((data) => {
            
            this.mvlist =this.mvlist.concat(data.data)
          });
        }
      }
    },
    playmv(index, id) {
      this.mvnum = index;
      getMvurl({ id, r: 270 }).then((data) => {
        this.mvurl = data.data.url;
      });
    },
  },
  mounted() {
    this.getmvdata();
    this.$nextTick(() => {
      window.addEventListener("scroll", this.handScroll);
    });
  },
};
</script>


<style lang="less" scoped>
video {
  width: 100%;
  height: 100%;
}
ul {
  width: 100%;
  li {
    position: relative;
    .play{
      width: 80px;
      height: 80px;
      line-height: 80px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 50%;
      text-align: center;
      span{
        color: #fff;
        font-size: 30px;
      }
    }
    .img {
      width: 100%;
      img {
        width: 100%;
      }
    }
    .title {
      font-size: 16px;
      text-indent: 1em;
      height: 30px;
      line-height: 30px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }
}
</style>