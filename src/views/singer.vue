<template>
  <div>
    <!-- <scroll></scroll> -->
    <div class="loading" v-if="isload">
      <van-loading type="spinner" color="#1989fa" />
    </div>
    <div class="content1" >
      <div class="left" ref="left">
        <ul>
          <li
            class="sing_item"
            v-for="(item, index) in artistsList"
            :key="index"
           
          >
            <div class="separate aa">
              {{ item.name == "re" ? "热门" : item.name }}
            </div>
            <!-- <div class="singer" v-for="(val,item) in artistsList[index]" :key="item"> -->
            <div
              class="singer"
              v-for="(val, key) in item.data"
              :key="key"
              @click="gosingerlist(val.id)"
              
            >
              <div class="img">
                <!-- <img
                  src="https://p1.music.126.net/zC7MYnme_qo36jJ_7JHN-w==/109951165841995391.jpg"
                  alt=""
                /> -->
                
                <img :src="val.img1v1Url"  alt=""  />
              </div>
              <div class="name">{{ val.name }}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="letterNav" ref="letter">
      <div
        :class="['hot', 'letterlis', { con: currentIndex == index }]"
        v-for="(item, index) in list"
        :key="index"
        @click.once="selectItem(index)"
      >
        {{ item == "re" ? "热" : item }}
      </div>
    </div>
  </div>
</template>

<script>
import { getBanner } from "../api/recommend";
import BScroll from "@better-scroll/core";
export default {
  data() {
    return {
      str: '"artist/list?type=1&area=96&limit=5&initial="',
      isload: true,
      list: [
        "re",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ],
      scrollY: "",
      listsHeight: [],
      data: [],
      artistsList: [],
      isopen: false,
    };
  },
  created() {
    this.init();
    this.getArtistListsFun();
    setTimeout(() => {
      (this.isload = false), this.initOnce();
    }, 2000);
  },
  methods: {
    initOnce() {
      this._initScoroll();
      this._getHeight();
      this.isopen = true;
    },
    gosingerlist(id) {
      if (this.isopen) {
        this.isopen = false;
        this.$router.push({
          path: "/singerlist",
          query: { id, type: "singerlist" },
        });
      }
    },
    // 初始化数据
    init() {
      for (let i = 0; i < this.list.length; i++) {
        this.artistsList.push({
          name: this.list[i],
        });
      }
    },
    // 获取热门歌手
    getTopArtistListsFun() {
      getBanner("top/artists?offset=0&limit=5").then((data) => {
        this.artistsList.splice(0, 1, { name: "re", data });
      });
    },
    // 获取名字首字母信息
    getArtistListsFun() {
      for (let key in this.artistsList) {
        let str =
          "artist/list?type=1&area=96&limit=5&initial=" +
          this.artistsList[key].name;
        if (this.artistsList[key].name == "re") {
          getBanner("top/artists?offset=0&limit=5").then((data) => {
            console.log(data);
            this.$set(this.artistsList[key], "data", data.artists);
          });
        } else {
          getBanner(str).then((data) => {
            this.$set(this.artistsList[key], "data", data.artists);
          });
        }
      }
      // console.log(this.artistsList);
    },
    // bscroll插件
    _initScoroll() {
      this.sin = null;
      this.sin = new BScroll(this.$refs.left, {
        probeType: 3,
        click: true,
      });
      this.sin.on("scroll", (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    // 获取内容高度
    _getHeight() {
      let sinItems = this.$refs.left.getElementsByClassName("sing_item");
      let height = 0;
      this.listsHeight.push(height);
      for (let i = 0; i < sinItems.length; i++) {
        let item = sinItems[i];
        height += item.clientHeight;
        this.listsHeight.push(height);
      }
    },
    // 点击字母跳转
    selectItem(index) {
      // console.log(index);
      let sinItems = this.$refs.left.getElementsByClassName("sing_item");
      // console.log(sinItems);
      let el = sinItems[index];
      this.sin.scrollToElement(el, 300);
    },
  },
  watch: {},
  Updated() {},
  computed: {
    // 判断当前歌手的首字母
    currentIndex() {
      for (let i = 0; i < this.listsHeight.length; i++) {
        let height = this.listsHeight[i];
        let height2 = this.listsHeight[i + 1];
        if (!height2 || (this.scrollY >= height && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    },
  },
  mounted() {
    this.$nextTick(() => {
      this._initScoroll();
    });
  },
};
</script>

<style scoped lang="less">
.loading{
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 10000;
  background: rgba(255, 255, 255, 0.7);
  padding: 45%;
}
.content1 {
  padding-bottom: 198px;
  position: fixed;
  top: 135.0016px;
  bottom: 0.8125rem;
  width: 100%;
  overflow: hidden;
  display: flex;
  .left {
    width: 100%;
  }
}
.singer {
  width: 97%;
  margin: 0 auto;

  height: 1.9375rem;
  display: flex;
  .img {
    width: 1.7188rem;
    margin-top: 0.1563rem;
    margin-right: 0.625rem;
    img {
      border-radius: 0.1563rem;
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .name {
    line-height: 1.875rem;
    font-size: 0.4063rem;
  }
}
.separate {
  height: 0.5469rem;
  line-height: 0.5469rem;
  font-size: 0.3125rem;
  background: #dadbdc;
  text-indent: 0.2344rem;
  color: white;
  margin: 0.0781rem 0;
  width: 100%;
}
.letterNav {
  position: fixed;
  right: 5%;
  height: 6.25rem;
  top: 25%;
  font-size: 0.3125rem;
  width: 0.2344rem;
  color: #6d6d6f;
  .letter {
    div {
      width: 100%;
      height: 0.1563rem;
      margin-top: 0.1563rem;
    }
  }
  .con {
    color: #d33e31;
  }
}
.aa {
  margin-top: 0 !important;
}
</style>
