<template>
  <div>
    <div class="header">
      <div
        class="bg"
        :style="'background-image:url(' + songslist.coverImgUrl + ')'"
      ></div>
         <span class="iconfont icon-shanchu1" @click="$router.go(-1)"></span>
      <div class="cover">
        <img :src="songslist.coverImgUrl" alt="" />
        <span class="remd_lnum">{{ songslist.playCount | playnum }}</span>
      </div>
      <div class="name">
        <div class="title">{{ songslist.name }}</div>
        <div class="user">
          <div class="userimg">
            <img :src="songslist.creator.avatarUrl" alt="" />
          </div>
          <div class="username">{{ songslist.creator.nickname }}</div>
        </div>
      </div>
    </div>
    <div class="songlist">
      <dl>
        <dt>歌曲列表</dt>
        <dd
          v-for="(item, index) in songslist.tracks"
          :key="index"
          @click="playmusic(index)"
        >
          <h1>{{ index + 1 }}</h1>
          <div class="info">
            <h2>{{ item.name }}</h2>
            <h3>
              <span v-for="(val, key) in item.ar" :key="key">{{
                val.name
              }}</span
              >-{{ item.al.name }}
            </h3>
          </div>
          <div class="play">
            <span class="iconfont icon-player-pause-circle"></span>
          </div>
        </dd>
      </dl>
    </div>
    <div class="hotcomment" v-if="hotcomment.length">
      <dl>
        <dt>精彩评论</dt>
        <dd v-for="(item, index) in hotcomment" :key="index">
          <h1>
            <div class="user">
              <img :src="item.user.avatarUrl" alt="" />
            </div>
            <div class="cmt">
              <div class="username">{{ item.user.nickname }}</div>
              <div class="time">{{ item.time | timefor }}</div>
            </div>
            <div class="good">
              <div class="num">{{ item.likedCount }}</div>
              <span class="iconfont icon-dianzan"></span>
            </div>
          </h1>
          <h2>
            <span v-if="item.beReplied.length"
              >回复<a href="#">@{{ item.beReplied[0].user.nickname }}</a></span
            >
            {{ item.content }}
            <div class="reply" v-if="item.beReplied.length">
              @{{ item.beReplied[0].user.nickname }}:{{
                item.beReplied[0].content
              }}
            </div>
          </h2>
        </dd>
      </dl>
    </div>
    <div class="newcomment" v-show="newcomment.length">
      <dl>
        <dt>最新评论</dt>
        <dd v-for="(item, index) in newcomment" :key="index">
          <h1>
            <div class="user">
              <img :src="item.user.avatarUrl" alt="" />
            </div>
            <div class="cmt">
              <div class="username">{{ item.user.nickname }}</div>
              <div class="time">{{ item.time | timefor }}</div>
            </div>
            <div class="good">
              <div class="num">{{ item.likedCount }}</div>
              <span class="iconfont icon-dianzan"></span>
            </div>
          </h1>
          <h2>
            <span v-if="item.beReplied.length"
              >回复<a href="#">@{{ item.beReplied[0].user.nickname }}</a></span
            >
            {{ item.content }}
            <div class="reply" v-if="item.beReplied.length">
              @{{ item.beReplied[0].user.nickname }}:{{
                item.beReplied[0].content
              }}
            </div>
          </h2>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import { getArtistLists, getCommentLists } from "../api/songlist";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      songslist: {
        creator: {
          nickname: "",
        },
      },
      newcomment: [],
      hotcomment: [],
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
    timefor(val) {
      let time = new Date(val);
      let  y = time.getFullYear();
      let  m = time.getMonth() + 1;
      let  d = time.getDate();
      let  h = time.getHours();
      let  mm = time.getMinutes();
      let newtime = new Date();
       let  newy = newtime.getFullYear();
      let  newm = newtime.getMonth() + 1;
      let  newd = newtime.getDate();
      let  newh = newtime.getHours();
      let  newmm = newtime.getMinutes();
      if(y == newy  && m == newm && d == newd && h == newh){
        let formm = newmm - mm
        return formm+"分钟前"
      }else if(y == newy  && m == newm && d == newd){
        let forh = h>=10?h:"0"+h
         let formm = mm>=10 ? mm:"0"+mm
        return forh+":"+formm
      }else if(y == newy  && m == newm && d == newd-1){
        let forh = h>=10?h:"0"+h
         let formm = mm>=10 ? mm:"0"+mm
        return  "昨天"+forh+":"+formm
      }else{
        return y+"年"+m+"月"+d+"日"
      }
    },
  },
  methods: {
    ...mapActions(["playlist"]),
    playmusic(index) {
       this.playlist({data:this.songslist.tracks,index});
    },
    getsongs() {
      let id = this.$route.query.id;
      getArtistLists({ id }).then((data) => {
        this.songslist = data.playlist;
      });
      getCommentLists({ id }).then((data) => {
        // console.log(data);
        this.newcomment = data.comments;
        this.hotcomment = data.hotComments;
      });
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getsongs();
    });
  },
};
</script>

<style lang="less" scoped>
a {
  color: #517daf;
}
.reply {
  padding: 10px;
  border: 1px solid #e5e5e5;
  margin-top: 5px;
  line-height: 25px;
  color: #888888;
}
h1 {
  margin: 0;
}
.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  filter: blur(20px);
  background-repeat: no-repeat;
  background-size: cover;
  background-size: 150% 150%;
  background-position: 50%;
  transform: scale(1.5);
  box-sizing: border-box;
  overflow: hidden;
}
.bg::after {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  background-size: cover;
  box-sizing: border-box;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.25);
}
.header {
  overflow: hidden;
  position: relative;
  height: 205px;
  width: 100%;
  box-sizing: border-box;
  padding: 30px 15px 0 15px;
  display: flex;
  .icon-shanchu1{
      display: block;
      position: absolute;
      top: 30px;
      right: 20px;
      font-size: 30px;
      color: #fff;
    }
  .cover {
    height: 145px;
    position: relative;
    flex: 0 0 145px;
    
    img {
      width: 100%;
      height: 100%;
    }
    // background: aqua;
    .remd_lnum {
      color: #fff;
      position: absolute;
      top: 0;
      right: 0;
      font-size: 12px;
    }
  }
  .name {
    flex: 1;
    height: 145px;
    margin-left: 15px;
    .title {
      height: 45px;
      color: #fff;
      font-size: 18px;
    }
    .user {
      display: flex;
      margin-top: 20px;
      height: 30px;
      .userimg {
        height: 30px;
        flex: 0 0 30px;
        border-radius: 50%;
        overflow: hidden;
        background: #333;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .username {
        padding-left: 5px;
        box-sizing: border-box;
        flex: 1;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        color: hsla(0, 0%, 100%, 0.7);
      }
    }
  }
}
dt {
  height: 23px;
  line-height: 23px;
  color: #666666;
  padding-left: 10px;
  width: 100%;
  box-sizing: border-box;
  font-size: 12px;
  background: #eeeff0;
}
.songlist {
  background-color: #fff;
  width: 100%;
  dl {
    width: 100%;
    dd {
      display: flex;
      height: 57px;
      h1 {
        margin: 0;
        height: 56px;
        line-height: 56px;
        flex: 0 0 39px;
        font-size: 17px;
        color: #999999;
        text-align: center;
        font-weight: normal;
      }
      .info {
        flex: 1;
        border-bottom: 1px solid #e5e5e5;
        height: 45px;
        margin-top: 10px;
        h2 {
          height: 17px;
          width: 100%;
          font-weight: normal;
          font-size: 18px;
          overflow: hidden;
          color: #363636;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        h3 {
          overflow: hidden;
          margin-top: 9px;
          font-size: 12px;
          font-weight: normal;
          color: #888888;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
      }
      .play {
        flex: 0 0 42px;
        height: 55px;
        border-bottom: 1px solid #e5e5e5;
        line-height: 55px;

        color: #acacac;
        span {
          font-size: 22px;
        }
      }
    }
  }
}
.hotcomment {
  dd {
    padding-top: 10px;
  }
  h1 {
    font-weight: normal;
    display: flex;
    height: 40px;
    .user {
      flex: 0 0 50px;
      height: 40px;
      // background: aqua;
      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: block;
        margin: 0 auto;
      }
    }
    .cmt {
      flex: 1;
      .username {
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        color: #666666;
      }
      .time {
        font-size: 10px;
        height: 10px;
        margin-top: 2px;
        color: #999999;
      }
    }
    .good {
      flex: 0 0 45px;
      display: flex;
      line-height: 50px;
      height: 50px;
      font-size: 12px;
      span {
        display: block;
        margin-top: -2px;
        margin-left: 3px;
      }
    }
  }
  h2 {
    margin-left: 50px;
    font-size: 16px;
    font-weight: normal;
    border-bottom: 1px solid #e5e5e5;
    margin-top: 5px;
    padding-bottom: 14px;
  }
}
.newcomment {
  dd {
    padding-top: 10px;
  }
  h1 {
    font-weight: normal;
    display: flex;
    height: 40px;
    .user {
      flex: 0 0 50px;
      height: 40px;
      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: block;
        margin: 0 auto;
      }
    }
    .cmt {
      flex: 1;
      .username {
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        color: #666666;
      }
      .time {
        font-size: 10px;
        height: 10px;
        margin-top: 2px;
        color: #999999;
      }
    }
    .good {
      flex: 0 0 45px;
      display: flex;
      line-height: 50px;
      height: 50px;
      font-size: 12px;
      span {
        display: block;
        margin-top: -2px;
        margin-left: 3px;
      }
    }
  }
  h2 {
    margin-left: 50px;
    font-size: 16px;
    font-weight: normal;
    border-bottom: 1px solid #e5e5e5;
    margin-top: 5px;
    padding-bottom: 14px;
  }
}
</style>