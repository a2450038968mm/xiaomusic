<template>
  <div>
    <div class="userx">
      <div class="user">
        <div class="userimg">
          <img :src="user.avatarUrl" alt="" />
        </div>
        <div class="username">
          {{ user.nickname }}
        </div>
        <div class="exit" @click="exit">退出登录</div>
      </div>
      <div class="header">
        <span class="iconfont icon-icon--" @click="$router.push({path:'/recommend'})"></span>
        <ul>
          <li :class="{ con: !ishis }" @click="togger(false)">我喜欢的音乐</li>
          <li :class="{ con: ishis }" @click="togger(true)">播放记录</li>
        </ul>
      </div>

      <dl class="list" v-show="!ishis">
        <dt @click="playsong(0)">
          <span class="iconfont icon-player-pause-circle"></span>
          播放全部
        </dt>
        <dd
          v-for="(item, index) in songlist"
          :key="index"
          @click="playsong(index)"
        >
          <h1>{{ index + 1 }}</h1>
          <div class="info">
            <h2>{{ item.name }}</h2>
            <h3>
              <span>歌手名</span>
              <span v-for="(val, key) in item.ar" :key="key">{{
                key > 0 ? "/" + val.name : val.name
              }}</span
              >&nbsp;&nbsp;
            </h3>
          </div>
        </dd>
      </dl>

      <dl class="hisplay" v-show="ishis">
        <dt>
          <span
            class="iconfont icon-player-pause-circle"
            @click="playhis(0)"
          ></span>
          播放全部
        </dt>
        <dd
          v-for="(item, index) in hislist"
          :key="index"
          @click="playhis(index)"
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
          <div class="cont" v-if="hisplay">
            播放{{ hisplay[index].score * 10 }}次
          </div>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { getlike, getsongs, gethisplay, exitlogin } from "../api/user";
export default {
  data() {
    return {
      songlist: [],
      hisplay: [],
      hislist: [],
      ishis: false,
    };
  },
  computed: {
    ...mapState(["user", "cookie"]),
  },
  methods: {
    ...mapActions(["playlist","logins","setshowbottom"]),
    exit() {
      exitlogin().then(data=>{
        if(data.code == 200){
          this.logins(false)
          this.$router.push({path:"/login"})
          this.setshowbottom({name:"showbottom",data:false})
        }
      })
    },
    togger(data) {
      this.ishis = data;
    },
    playsong(index) {
      this.playlist({ data: this.songlist, index });
    },
    playhis(index) {
      this.playlist({ data: this.hislist, index });
    },
  },
  created() {
    let songids = null;
    getlike({ id: this.user.userId, cookie: this.cookie }).then((data) => {
      songids = data.ids;
      let str = songids.toString();
      getsongs({ ids: str }).then((data) => {
        this.songlist = data.songs;
      });
    });
    gethisplay({ uid: this.user.userId, type: 0 }).then((data) => {
      this.hisplay = data.allData;
      let arr = [];
      for (let i = 0; i < data.allData.length; i++) {
        arr.push(data.allData[i].song);
      }
      this.hislist = arr;
    });
  },
};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.userx {
  box-sizing: border-box;
  padding-top: 50px;
  background-color: #f0f0f0;
}
.cont {
  flex: 0 0 120px;
  height: 91px;
  font-size: 20px;
  line-height: 91px;
  color: #747575;
}
.user {
  margin: 0 auto;
  background-color: #fff;
  border-radius: 50px;
  width: 70%;
  height: 200px;
  .userimg {
    position: relative;
    top: -45px;
    width: 200px;
    height: 100px;
    margin: 0 auto;
    text-align: center;
    line-height: 200px;
    img {
      background: aqua;
      border-radius: 50%;
      width: 50%;
      height: 100%;
    }
  }
  .username {
    height: 50px;
    line-height: 40px;
    width: 75%;
    margin: 0 auto;
    font-size: 25px;
    font-weight: bold;
    text-align: center;
  }
  .exit {
    font-size: 24px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
}
.header {
  display: flex;
  width: 100%;
  margin: 20px 0;
  span {
    font-size: 50px;
    flex: 0 0 80px;
  }
  ul {
    flex: 1;
    display: flex;
    li {
      flex: 1;
      height: 50px;
      line-height: 50px;
      border-radius: 50px;
      text-align: center;
      font-size: 24px;
      &.con {
        background: #d4473c;
        color: #fff;
      }
    }
  }
}
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
</style>