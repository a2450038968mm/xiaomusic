<template>
  <div>
    <!-- <playlist
     
      :showlist="showlist"
      :index="index"
      @toggerlist-com="toggerlist"
      @getlist-data="getlist"
      @playthis-com="playthis"
      :playtype="playtype"
    ></playlist> -->
    <playlist
      v-show="showlist"
      :showlist="showlist"
      @exitlist-com="exitlist"
    ></playlist>
    <div class="playing" v-if="showbottom">
      <audio
        ref="audio"
        :autoplay="nextauto"
        :src="$store.state.playurl"
      ></audio>
      <div class="img" @click="toggledetail">
        <img
          v-if="song[0].al"
          :class="['play', { pause: play }]"
          :src="song[0].al.picUrl"
          alt=""
        />
      </div>
      <div class="name">
        <h2>{{ song[0].name }}</h2>
        <h3>
          <span v-for="(item, index) in song[0].ar" :key="index">{{
            item.name
          }}</span>
        </h3>
      </div>
      <div class="play" @click="togger">
        <span v-show="play" class="iconfont icon-bofang1"></span>
        <span v-show="!play" class="iconfont icon-icon_bofang"></span>
      </div>
      <div class="list" @click="add">
        <span class="iconfont icon-liebiao"></span>
      </div>
    </div>

    <!-- 详情页 -->
    <div class="bigplay" v-show="godetails">
      <div class="mask">
        <div class="header">
          <div class="exit" @click="toggledetail">
            <span class="iconfont icon-xia"></span>
          </div>
          <div class="title">
            <h2>{{ song[0].name }}</h2>
            <h3>
              <span v-for="(item, index) in song[0].ar" :key="index">{{
                item.name
              }}</span>
            </h3>
          </div>
        </div>
        <!-- 封面 -->
        <div class="cover" @click="toggerlrc">
          <!-- <div class="cover"> -->
          <div class="img" v-show="!showlrc">
            <!-- <div class="img"> -->
            <img
              :class="[{ play: toggercover }, { pause: play }]"
              :src="song[0].al.picUrl"
              alt=""
            />
          </div>
          <div class="lyric" v-show="showlrc">
            <ul ref="lrclist" style="top: 300px" :class="{ animat: !isdrage }">
              <li
                v-for="(item, index) in lrc"
                :key="index"
                :class="{ con: lrcindex == index }"
              >
                {{ item.text }}
              </li>
            </ul>
          </div>
        </div>
        <div class="progressbar">
          <div class="bar">
            <span class="thistime">{{ ingtime | timeformat }}</span>
            <van-slider
              v-model="ingtime"
              @drag-start="drag"
              @change="settime($event)"
              @drag-end="dragend"
              active-color="#ee0a24"
              bar-height="5px"
              step="1"
              :max="endtime"
            >
              <template #button>
                <div class="custom-button"></div>
              </template>
            </van-slider>
            <span class="totaltime">{{ endtime | timeformat }}</span>
          </div>
        </div>
        <div class="foot">
          <span
            :class="[
              'iconfont',
              { 'icon-M_xunhuan': playtype == 1 },
              { 'icon-icon-': playtype == 2 },
              { 'icon-hanhan-01-01': playtype == 3 },
            ]"
            @click="toggerplaytype"
          ></span>
          <span class="iconfont icon-shangyishou" @click="upplay1"></span>
          <span
            v-show="!play"
            class="stop iconfont icon-stopfill"
            @click="togger"
          ></span>
          <span
            v-show="play"
            class="stop iconfont icon-player-pause-circle"
            @click="togger"
          ></span>
          <span class="iconfont icon-xiayishou" @click="nextplay1"></span>
          <div class="love">
            <span class="iconfont icon-xihuan" v-show="!islove"></span>
            <span class="iconfont icon-xihuan1 red" v-show="islove"></span>
            <span class="iconfont icon-liebiao" @click="add"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import playlist from "./playlist";
export default {
  data() {
    return {
      lovesongindex: null,
      islove: false,
      play: true,
      showlist: false,
      godetails: false,
      toggercover: true, //封面旋转
      ingtime: 0, //当前时间
      endtime: 100, //总时长
      timer: null, //定时器
      playtype: 1, //播放样式
      isdrage: false, //是否为拖拽状态
      loadend: false, //音频是否加载完成
      nextauto: false, //  播放完下一首是否自动播放
      showlrc: false,
      lrcindex: null,
      monitor: 0,
    };
  },
  computed: {
    ...mapState([
      "playurl",
      "showbottom",
      "playlists",
      "song",
      "playindex",
      "lrc",
      "lovesong",
    ]),
  },
  methods: {
    ...mapActions([
      "upplay",
      "nextplay",
      "amendindex",
      "setlovesong",
      "relovesong",
    ]),
    // 显示歌词
    toggerlrc() {
      this.showlrc = !this.showlrc;
    },
    // 下一首
    nextplay1() {
      this.nextplay();
      clearInterval(this.timer);
      this.play = true;
      this.$refs.audio.pause();
      this.toggercover = false;
    },
    // 上一首
    upplay1() {
      this.toggercover = false;
      // 切换上一首
      this.upplay();
      // 清楚定时器
      clearInterval(this.timer);
      // 图片停止旋转
      this.play = true;
      // 暂停播放
      this.$refs.audio.pause();
    },
    // 切换播放格式
    toggerplaytype() {
      this.playtype += 1;
      if (this.playtype > 3) {
        this.playtype = 1;
      }
    },
    //  播放/暂停
    togger() {
      this.nextauto = !this.nextauto;
      console.log(this.$refs.audio.src);
      if (this.loadend || (this.monitor <= 1 && this.$refs.audio.src.length>0)) {
        if (this.play) {
          this.$refs.audio.play();
          this.toggercover = true;
          this.timer = setInterval(() => {
            if (!this.isdrage && this.$refs.audio.readyState) {
              this.ingtime = parseInt(this.$refs.audio.currentTime); //获取当前时间
              // 播放完成
              if (this.$refs.audio.ended) {
                this.ingtime = 0;
                this.toggercover = false;
                if (this.playtype == 1) {
                  this.nextplay();
                } else if (this.playtype == 2) {
                  let index = parseInt(Math.random() * this.playlists.length);
                  if (index == this.song.length) {
                    index -= 1;
                  }
                  this.amendindex(index);
                }
                console.log("播放完毕");
                clearInterval(this.timer);
                // 单曲循环播放完比暂停
                this.play = true;
                // 清楚定时器
              }
            }
          }, 999);
        } else {
          this.$refs.audio.pause();
        }
        // 图片旋转
        this.play = !this.play;
      }
    },
    //  弹出播放列表
    add() {
      this.showlist = true;
    },
    // 隐藏播放列表
    exitlist() {
      this.showlist = false;
    },
    // 显示音乐详情
    toggledetail() {
      this.godetails = !this.godetails;
    },
    // 开始拖动进度条
    drag() {
      this.isdrage = true;
    },
    // 结束拖拽进度条
    dragend() {
      this.isdrage = false;
    },
    // 点击进度条
    settime(event) {
      this.$refs.audio.currentTime = event;
      this.ingtime = event;
    },
  },
  components: {
    playlist,
  },
  watch: {
    playindex() {
      this.play = true;
      this.ingtime = 0;
      this.lrcindex = 0;
      this.nextauto = false;
      this.$refs.audio.pause();
      clearInterval(this.timer);
      this.monitor += 1;
      if (this.monitor <= 1) {
        this.$refs.audio.addEventListener("canplay", () => {
          console.log("加载完毕");
          this.engtime = this.endtime = this.$refs.audio.duration;
          this.loadend = true;
          // }
        });
      }
    },
    ingtime(newval, oldval) {
      newval = parseInt(newval);
      oldval = parseInt(oldval);
      if (newval > 0 && !this.play) {
        if (newval > oldval) {
          for (let i = 0; i < this.lrc.length; i++) {
            if (this.ingtime == this.lrc[i].time) {
              this.lrcindex = i;
              this.$refs.lrclist.style.top = 300 - 50 * i + "px";
            }
          }
        } else {
          for (let i = 0; i < this.lrc.length; i++) {
            if (this.ingtime == this.lrc[i].time) {
              this.lrcindex = i;
              this.$refs.lrclist.style.top = 300 - 50 * i + 50 + "px";
            }
          }
        }
      }
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  },
  filters: {
    // 过滤时长
    timeformat(val) {
      let min = parseInt(val / 60);
      let s = parseInt(val % 60);
      s = s > 9 ? s : "0" + s;
      min = min > 9 ? min : "0" + min;
      return min + ":" + s;
    },
  },
};
</script>



<style lang="less" scoped>
.red {
  color: #ee0a24 !important;
}
.custom-button {
  width: 9px;
  height: 9px;
  color: #fff;
  border: 10px solid #fff;
  background-color: #ee0a24;
  border-radius: 50%;
}
.bigplay {
  position: fixed;
  // overflow: hidden;
  top: 0;
  width: 100%;
  height: 100%;
  margin: auto;
  z-index: 1050;
  background: #7e7a78;
  .header {
    text-align: center;
    display: flex;
    color: #fff;
    .exit {
      flex: 0 0 77px;
      height: 68px;
      line-height: 68px;
      span {
        font-size: 32px;
      }
    }
    .title {
      text-indent: -77px;
      flex: 1;
      h2 {
        margin-top: 10px;
        font-size: 28px;
      }
      h3 {
        font-size: 20px;

        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
    }
  }
  .cover {
    margin-top: 99px;
    margin-bottom: 126px;
    height: 666px;
    width: 666px;
    .lyric {
      width: 468px;
      height: 600px;
      position: relative;
      text-align: center;
      overflow: hidden;
      margin: 0 auto;
      .animat {
        transition: all 1s;
      }
      ul {
        position: absolute;
        width: 100%;
        top: 300px;

        li {
          text-align: center;
          height: 50px;
          line-height: 50px;
          width: 100%;
          font-size: 20px;
        }
        .con {
          color: #fff;
        }
      }
    }
    .play {
      animation: play 20s linear infinite;
    }
    .pause {
      animation-play-state: paused;
    }
    .img {
      height: 468px;
      width: 468px;
      border: 24px solid #928d8a;
      border-radius: 50%;
      margin: 0 auto;
      background: #fff;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
  }
  .progressbar {
    text-align: center;
    .bar {
      margin: 0 auto;
      width: 420px;
      position: relative;
      span {
        position: absolute;
        display: block;
        top: -8px;
        color: #efeeed;
      }
      .thistime {
        left: -70px;
      }
      .totaltime {
        right: -80px;
      }
    }
  }
  .foot {
    margin-top: 30px;
    display: flex;
    align-content: space-between;
    box-sizing: border-box;
    padding: 0 30px 72px 30px;
    width: 100%;
    & > span {
      width: 20%;
      text-align: center;
      display: block;
      font-size: 50px;
      color: #fff;
      line-height: 77px;
    }
    .love {
      width: 20%;
      line-height: 70px;
      span {
        font-size: 40px;
        color: #fff;
        margin-left: 25px;
      }
      text-align: center;
    }
    .stop {
      font-size: 70px;
      line-height: 87px;
      margin-top: -10px;
    }
  }
}
.playing {
  margin: 0 auto;
  z-index: 1000;
  width: 100%;
  height: 92px;
  position: fixed;
  display: flex;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  .img {
    .play {
      animation: play 20s linear infinite;
    }
    .pause {
      animation-play-state: paused;
    }
    flex: 0 0 110px;
    height: 100%;
    img {
      margin: 15px 0 0 30px;
      border-radius: 50%;
      width: 63px;
      height: 63px;
    }
  }
  .name {
    flex: 1;
    margin-top: 20px;
    h2 {
      font-size: 22px;
    }
    h3 {
      font-size: 18px;
    }
  }
  .play {
    flex: 0 0 47px;
    height: 47px;
    position: relative;
    margin-top: 25px;
    font-weight: normal;
    span {
      display: block;
      position: absolute;
      font-size: 49px;
      top: 50%;
      left: 50%;
      margin-top: -30px;
      margin-left: -15px;
    }
  }
  .list {
    flex: 0 0 47px;
    margin-left: 22px;
    margin-top: 20px;
    line-height: 47px;
    height: 47px;
    .icon-liebiao {
      font-size: 40px;
    }
  }
  @keyframes play {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>