<template>
  <div>
    <div class="banner">
      <div class="imgs">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(item, index) in banners" :key="index">
            <img :src="item.pic" alt="" />
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <div class="remLists">
      <div class="title">推荐歌单</div>
      <div class="content">
        <ul class="clearfix">
          <li
            v-for="(item, index) in songLists"
            :key="index"
            @click="gosonglist(item.id)"
          >
            <img :src="item.picUrl" alt="" />
            <!-- <span class="remd_lnum">{{item.playCount | playnum}}</span> -->
            <span class="remd_lnum">{{ item.playCount | playnum }}</span>
            <p>{{ item.name }}</p>
          </li>
        </ul>
      </div>
    </div>
    <recommendsongs></recommendsongs>
  </div>
</template>

<script>
import { getBanner } from "../api/recommend";
import recommendsongs from "../components/recommend/recommendsongs";
export default {
  components:{
    recommendsongs
  },
  data() {
    return {
      banners: "",
      songLists: "",
    };
  },
  created() {
    getBanner("banner?type=2").then((data) => {
      if (data.code == 200) {
        this.banners = data.banners;
      }
    });
    getBanner("personalized?limit=9").then((data) => {
      if (data.code == 200) {
        this.songLists = data.result;
      }
    });
  },
  filters: {
    playnum(num) {
      let val = null;
      if (num > 10000) {
        val = (num / 10000).toFixed(1) + "万";
      } else {
        val = num;
      }
      if (parseInt(val) > 10000) {
        val = (parseInt(val) / 10000).toFixed(1) + "亿";
      }
      return val;
    },
  },
  methods: {
    gosonglist(id) {
      this.$router.push({ path: "/songparticulars", query: { id, type: "songlist" } });
    },
  },
};
</script>

<style scoped lang="less">
.banner {
  width: 100%;
  height: 5.2344rem;
  background: #d4473c;
  height: 228px;
  .imgs {
    width: 95%;

    margin: 0 auto;
    height: 228px;
    border-radius: 8px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}

.remLists {
  .title {
    height: 100px;
    line-height: 100px;
    font-weight: bold;
    text-indent: 0.5em;
    font-size: 32px;
  }
  .content li {
    width: 33.33%;
    float: left;
    position: relative;
    margin-bottom: 16px;
    img {
      display: block;
      width: 95%;
      margin: 0 auto;
      border-radius: 3px;
    }
    .remd_lnum {
      position: absolute;
      top: 0;
      right: 10px;
      font-size: 22px;
      color: #fff;
    }
    p {
      font-size: 26px;
      color: #2f3035;
      height: 50px;
      overflow: hidden;
      line-height: 28px;
      padding: 10px 7px 6px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  text-align: center;
}
</style>