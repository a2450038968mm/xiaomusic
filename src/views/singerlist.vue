<template>
  <div>
    <div class="loading" v-if="isload">
      <van-loading type="spinner" color="#1989fa" />
    </div>
    <div class="topheader">
      <div class="button" @click="$router.go(-1)">
        <span class="iconfont icon-icon--"></span>
        歌手
      </div>

      <div class="img">
        <img :src="listdata.artist.img1v1Url" alt="" />
      </div>
      <div class="title">
        <div class="description">
          {{ listdata.artist.name }}
          <span v-if="listdata.artist.alias.length > 0"
            >({{ listdata.artist.alias[0] }})</span
          >
        </div>
      </div>
    </div>
    <div class="songlist">
      <dl>
        <dt>
          <span
            class="iconfont icon-player-pause-circle"
            @click="playmusic(0)"
          ></span>
          播放全部
          <!-- <span>(共{{ listdata.hotSongs.length }}首)</span> -->
          <span>(共{{ listdata.hotSongs.length }}首)</span>
        </dt>
        <dd
          v-for="(item, index) in listdata.hotSongs"
          :key="index"
          @click="playmusic(index)"
        >
          <h1>{{ index + 1 }}</h1>
          <div class="info">
            <h2>{{ item.name }}</h2>
            <h3>
              <span v-for="(val, key) in item.ar" :key="key">{{
                val.name
              }}</span>
            </h3>
          </div>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { getSingerlist } from "../api/songlist";
export default {
  data() {
    return {
      isload: true,
      listdata: {
        artist: {
          alias: [],
        },
        hotSongs: [],
      },
      type: this.$route.query.type,
    };
  },
  components: {},
  created() {
    let timer = setInterval(()=>{
      if(this.isload == false){
        console.log("完成");
        clearInterval(timer)
      }
    },100)
    // setTimeout(() => {
    //   this.isload = false;
    // }, 3000);
  },
  methods: {
    ...mapActions(["playlist"]),
    getsonglist() {
      let id = this.$route.query.id;
      if (!id) {
        return;
      }
      getSingerlist({ id }).then((data) => {
        this.listdata.artist = data.artist;
        this.listdata.hotSongs = data.hotSongs;
        this.isload =false
      });
    },
    playmusic(index) {
      this.playlist({ data: this.listdata.hotSongs, index });
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getsonglist();
    });
  },
};
</script>

<style lang="less" scoped>
.loading {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 10000;
  background: rgba(255, 255, 255, 0.7);
  padding: 45%;
}
.topheader {
  z-index: 10;
  width: 100%;
  height: 460px;
  position: relative;
  .img {
    width: 100%;
    img {
      width: 100%;
    }
  }
  .button {
    position: absolute;
    top: 20px;
    left: 22px;
    color: #fff;
    font-size: 27px;
    height: 30px;
    line-height: 30px;
    span {
      display: inline-block;
      font-size: 29px;
      color: #fff;
      visibility: top;
    }
  }
  .title {
    position: absolute;
    left: 22px;
    bottom: 47px;
    color: #fff;
    .description {
      font-size: 24px;
      font-weight: bold;
      overflow: hidden;
      height: 27px;
    }
    p {
      font-size: 18px;
      margin-top: 5px;
    }
  }
}
.songlist {
  z-index: 100;
  position: relative;
  top: -12px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  border-radius: 12px;
  background: #fff;
  min-height: 200px;
  dl {
    width: 100%;
    dt {
      height: 61px;
      line-height: 61px;
      font-size: 30px;
      span {
        font-size: 26px;
        color: #747575;
      }
      .icon-player-pause-circle {
        width: 75px;
        text-align: center;
        display: inline-block;
        font-size: 30px;
        line-height: 61px;
        color: #2f3130;
      }
    }
    dd {
      border-top: 2px solid #e1e1e1;
      height: 91px;
      display: flex;
      h1 {
        font-size: 26px;
        color: #757675;
        flex: 0 0 78px;
        text-align: center;
        font-weight: normal;
        height: 91px;
        line-height: 91px;
        margin: 0;
      }
      .info {
        flex: 1;
        h2 {
          font-size: 26px;
          color: #323635;
          margin-top: 15px;
          font-weight: normal;
        }
        h3 {
          margin-top: 5px;
          font-size: 20px;
          font-weight: normal;
          color: #717271;
          overflow: hidden;
          height: 23px;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
}
</style>