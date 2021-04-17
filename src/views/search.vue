<template>
  <div>
    <div class="topheader">
      <div class="button">
        <span class="iconfont icon-icon--" @click="$router.go(-1)"></span>
        <input
          type="text"
          placeholder="搜索歌曲、歌手"
          v-model.trim="val"
          @keyup.enter="search(val)"
        />
      <span
        class="iconfont icon-shanchu1"
        v-show="issear"
        @click="exitsear"
      ></span>
      </div>
    </div>
    <div class="cont" v-show="!issear">
      <div class="hot">
        <div class="top">
          <span class="title">热门搜索</span>
        </div>
        <div class="bottom">
          <span
            v-for="(item, index) in hotsearch"
            :key="index"
            @click="search(item.searchWord)"
            >{{ item.searchWord }}</span
          >
        </div>
      </div>
      <div class="history">
        <div class="top">
          <span class="title">历史记录</span>
          <span class="iconfont icon-shanchu11" @click="clearhis"></span>
        </div>
        <div class="bottom">
          <ul>
            <li v-for="(item, index) in $store.state.history" :key="index">
              <span @click="search(item)">{{ item }}</span>
              <span class="iconfont icon-shanchu1" @click="del(index)"></span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 搜索页面 -->
    <dl class="result" v-show="issear">
      <dd class="title" v-show="playlists.length == 0 || artists.length == 0">
        精准匹配
      </dd>
      <dd @click="gosinglist" class="singer" v-for="item in artists" :key="item.name">
        <div class="img">
          <img :src="item.img1v1Url" alt="" />
        </div>
        <div class="name">歌手：{{ item.name }}</div>
      </dd>
      <dd class="playlist" @click="gosonglist" v-for="(item) in playlists" :key="item.name">
        <div class="img">
          <img :src="item.coverImgUrl" alt="" />
        </div>
        <div class="name">歌单：{{ item.name }}</div>
      </dd>
      <dd
        v-for="(item, index) in songlist"
        :key="index"
        @click="playmusic(index)"
      >
        <div class="songname">{{ item.name }}</div>
        <div class="songart">
          <span v-for="(val, key) in item.artists" :key="key"
            >{{ val.name }}&nbsp;&nbsp;</span
          >
        </div>
      </dd>
    </dl>
  </div>
</template>

<script>
import { getHotSearch, getSearchActive, getSearch } from "../api/search";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      isnull: false,
      issear: false,
      val: "",
      hotsearch: [],
      historylist: this.$store.state.history,
      songlist: [],
      artists: [
      ],
      playlists: [
      ],
    };
  },
  created() {
    setTimeout(() => {
      this.historylist =
        JSON.parse(sessionStorage.getItem("his")) == null
          ? []
          : JSON.parse(sessionStorage.getItem("his"));
      // console.log(this.historylist);
    }, 100);
  },
  methods: {
    ...mapActions(['addhistory','clearhistory','del',"playlist"]),
    // 跳转歌手歌曲页
    gosinglist() {
      let id =this.artists[0].id;
      this.$router.push({
        path: "/singerlist",
        query: { id, type: "singerlist" },
      });
    },
    // 跳转歌单详情页
    gosonglist(){
      let id =this.playlists[0].id;
      // console.log(id);
      this.$router.push({path:"/songlist",query:{id,type:"songlist"}})
    },
    playmusic(index) {
      
       this.playlist({data:this.songlist,index});
      
    },
    // 推出搜索状态
    exitsear() {
      this.issear = false;
      this.val = "";
      this.playlists = [];
      this.artists = [];
    },
    // 清空搜索框
    clear() {
      this.val = "";

    },
    // 清空历史记录
    clearhis() {
      this.clearhistory()
      // this.historylist = [];
      sessionStorage.removeItem("his");
    },
    // 删除历史记录
    del(index) {
      this.delhistory(index)
      // this.historylist.splice(index, 1);
    },

    // 获取热门搜索
    gethot() {
      getHotSearch().then((data) => {
        this.hotsearch = data.data;
      });
    },
    // 存搜索记录
    storage() {
      this.addhistory(this.val)
      // console.log(this.historylist);
      // console.log(this.historylist);
      // this.historylist.unshift(this.val);
      // console.log(this.historylist);
      // // console.log(new Set(this.historylist));
      // this.historylist = [...new Set(this.historylist)];
      // // this.historylist.push("asd")
      // console.log(this.historylist);
      let hisstr = JSON.stringify(this.historylist);
      sessionStorage.setItem("his", hisstr);
    },
    // 搜索
    search(val) {
      if (val == "") {
        return;
      }
      this.val = val;
      this.storage();
      this.issear = true;
      getSearchActive({ keywords: val }).then((data) => {
        console.log(data.result);
        if (
          Array.isArray(data.result.artists) &&
          data.result.artists.length > 0
        ) {
          this.artists = data.result.artists;
        }
        if (
          Array.isArray(data.result.playlists) &&
          data.result.playlists.length > 0
        ) {
          this.playlists.push(data.result.playlists[0]);
          console.log(this.playlists);
        }
      });

      getSearch({ keywords: val, type: 1 }).then((data) => {
        this.songlist = data.result.songs;
      });
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.gethot();
    });
  },
  watch: {
    // 判断显示清除按钮
    val(val) {
      if (val != "") {
        this.isnull = true;
      } else {
        this.isnull = false;
      }
    },
  },
};
</script>

<style scoped lang="less">
.result {
  width: 100%;
 
  dd {
    padding: 14px 30px;
    width: 100%;
    box-sizing: border-box;
    font-size: 22px;
    color: #2e2f30;
    border-bottom: 1px solid #e1e1e1;
    height: 86px;
    .songname {
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
    div {
      height: 30px;
      line-height: 30px;
    }
    .songart {
      font-size: 16px;
      color: #636464;
    }
  }
  .title {
    height: 40px;
    font-size: 17px;
    color: #d5544b;
    border: none;
  }
  .singer,
  .playlist {
    padding: 10px 30px;
    height: 100px;
    display: flex;
    align-content: center;
    .name {
      height: 79px;
      line-height: 79px;
      font-size: 22px;
    }
  }
  .img {
    width: 79px;
    height: 79px;
    margin-right: 22px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
input {
  border: none;
  outline: none;
}
.topheader {
  width: 100%;
  height: 69px;
  
  box-sizing: border-box;
  background: #d4473c;
  position: relative;
  .icon-shanchu1 {
    display: block;
    position: absolute;
    height: 68px;
    line-height: 68px;
    // width: 68px;
    font-size: 26px;
    top: 0;
    right: 15px;
    color: #fff;
  }
  .button {
    padding-right: 60px;
    box-sizing: border-box;
    position: relative;
    display: flex;

    .icon-icon-- {
      display: block;
      flex: 0 0 68px;
      height: 68px;
      line-height: 68px;
      color: #fff;
      font-weight: bold;
      text-align: center;
      font-size: 26px;
    }
    
    .icon-tubiao39 {
      font-size: 15px;
      color: #fff;
      position: absolute;
      right: 0;
      top: 30px;
    }
    input {
      height: 35px;
      line-height: 35px;
      flex: 1;
      border-bottom: 1px solid #fff;
      background: transparent;
      display: block;
      margin-top: 17px;
      font-size: 24px;
      color: #fff;
    }
    input::-webkit-input-placeholder {
      color: #efb7b4;
      font-size: 24px;
    }
  }
}
.cont {
  margin: 0 auto;
  width: 90%;
  .hot {
    margin-top: 30px;
    .bottom {
      margin-top: 20px;
      span {
        border-radius: 10px;
        display: inline-block;
        padding: 10px;
        color: #3c3e3e;
        border: 2px solid #dcdddd;
        margin-right: 12px;
        margin-bottom: 12px;
      }
    }
  }
  .history {
    margin-top: 20px;
    .bottom {
      ul li {
        display: flex;
        margin-top: 30px;
        span {
          flex: 1;
        }
        .iconfont {
          flex: 0 0 30px;
        }
      }
    }
  }
  .top {
    display: flex;
    span {
      display: block;
      font-size: 20px;
      color: #8d8e8f;
    }
    .title {
      flex: 1;
    }
    .iconfont {
      display: block;
      flex: 0 0 30px;
    }
  }
}
</style>