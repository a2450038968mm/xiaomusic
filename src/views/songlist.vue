<template>
  <div>
    <div class="topheader">
      <div class="button" @click="$router.go(-1)" v-if="type == 'songlist'">
        <span class="iconfont icon-icon--"></span>
        歌单
      </div>
      <div class="img">
        <img :src="listdata.coverImgUrl" alt="" />
      </div>
      <div class="title">
        <div class="description">{{ listdata.description }}</div>
        <p>
          <span class="iconfont icon-erji"></span
          >{{ listdata.playCount | playnum }}
        </p>
      </div>
    </div>
    <div class="songlist">
      <dl>
        <dt @click="playmusic(0)">
          <span class="iconfont icon-player-pause-circle"></span>
          播放全部
          <span>(共{{ listdata.tracks.length }}首)</span>
        </dt>
        <dd
          v-for="(item, index) in listdata.tracks"
          :key="index"
          @click="playmusic(index)"
        >
          <h1>{{ index + 1 }}</h1>
          <div class="info">
            <h2>{{ item.name }}</h2>
            <h3>
              <span v-for="(val, key) in item.ar" :key="key">{{
                key > 0 ? "/" + val.name : val.name
              }}</span
              >&nbsp;&nbsp;
            </h3>
          </div>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import { getArtistLists } from "../api/songlist";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      listdata: {
        tracks: [],
        coverImgUrl: null,
      },
      type: this.$route.query.type,
    };
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
  components: {},
  methods: {
    ...mapActions(["playlist"]),
    playmusic(index) {
      this.playlist({data:this.listdata.tracks,index});
    },
    getsonglist() {
      let id = this.$route.query.id;
      if (!id) {
        return;
      }
      getArtistLists({ id }).then((data) => {
        this.listdata = data.playlist;
      });
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