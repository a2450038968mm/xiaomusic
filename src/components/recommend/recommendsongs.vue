<template>
  <div>
    <div class="songlist">
      <dl>
        <dt class="newmusic"><span>最新音乐</span></dt>
        <dd v-for="(item, index) in songslist" :key="index" @click="playmusic(index)">
          <div class="info">
            <h2>
              {{ item.name
              }}<span v-for="(val, key) in item.song.alias" :key="key"
                >({{ val }})</span
              >
            </h2>
            <h3>
              <span v-for="(val, key) in item.song.artists" :key="key"
                >&nbsp;{{ key > 0 ? "/" + val.name : val.name }}&nbsp;</span
              >
            </h3>
          </div>
          <span class="iconfont icon-player-pause-circle"></span>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import { getcommendsongs } from "../../api/getcommendsongs";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      songslist: [],
    };
  },
  created() {
    getcommendsongs().then((data) => {
      this.songslist = data.result;
    });
  },
  methods: {
    ...mapActions(["playlist"]),
    playmusic(index) {
      this.playlist({data:this.songslist,index});
    },
  },
};
</script>

<style lang="less" scoped>
.songlist {
  margin-top: 30px;
  .newmusic {
    font-size: 17px;

    height: 40px;
    line-height: 40px;
  }
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
        padding-left: 10px;
        border-left: 2px solid #d33a31;
        font-size: 28px;
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
      height: 55px;
      display: flex;
      padding-left: 10px;
      .icon-player-pause-circle {
        display: block;
        flex: 0 0 42px;
        text-align: center;
        line-height: 55px;
        height: 55px;
        font-size: 22px;
        color: #aeaeae;
      }
      .info {
        flex: 1;
        h2 {
          font-size: 24px;
          color: #323635;
          margin-top: 5px;
          height: 25px;
          line-height: 25px;
          font-weight: normal;
          span {
            display: inline-block;
            margin-left: 5px;
            font-size: 20px;
            color: #888888;
          }
        }
        h3 {
          height: 17px;
          line-height: 17px;
          font-size: 20px;
          font-weight: normal;
          margin-top: 5px;
          color: #717271;
          overflow: hidden;
          height: 23px;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          span {
            font-size: 18px;
          }
        }
      }
    }
  }
}
</style>