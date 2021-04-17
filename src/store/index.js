import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import { getMusicUrl, getMusicDatailed, getMusicLyric, } from "../api/getmusicurl";

// import {getMusicUrl} from "../api/getmusicurl";
// vuex-persistedstate 默认把数据存储localStorage
import createPersistedState from 'vuex-persistedstate'
export default new Vuex.Store({
  state: {
    login: false,
    history: [],
    playindex: null,
    playlists: [],
    playurl: "",
    isload: false,
    lovesong: [],
    user:{},
    song: [
      {
        al: {
          picUrl: "11",
        },
      },
    ],
    lrc: [],
    showbottom: false
  },
  mutations: {
    relovesong(state, data) {
      let index = state.lovesong.findIndex(item => {
        return item.id == data
      })
      state.lovesong.splice(index, 1)
    },
    setlovesong(state, data) {
      state.lovesong.push(data)
    },
    login(state,data) {
      state.login = data
    },
    ADDhistory(state, data) {
      state.history.unshift(data)
      state.history = [...new Set(state.history)]
    },
    CLEARhistory(state) {
      state.history = []
    },
    del(state, index) {
      state.history.splice(index, 1)
    },
    playlist(state, { data, index }) {
      state.playlists = data;
      state.playindex = index
      state.showbottom = true
    },
    nextplay(state) {
      state.playindex += 1
      if (state.playindex == state.playlists.length) {
        state.playindex = 0
      }
    },
    upplay(state) {
      state.playindex -= 1
      if (state.playindex < 0) {
        state.playindex = state.playlists.length - 1
      }
    },
    delplaylist(state, index) {
      state.playlists.splice(index, 1)
    },
    clearplaylist(state) {
      state.showbottom = false
      state.playlists = []
      state.url = ""
      state.playindex = state.playlists.length
    },
    amendindex(state, index) {
      state.playindex = index
    },
    set(state, obj) {
      let { name, data } = obj
      state[name] = data
    },
  },
  actions: {
    setshowbottom({commit},obj){
      commit("set",obj)
    },
    setcookie({commit},obj){
      commit("set",obj)
    },
    relovesong({commit},data){
      commit("relovesong",data)
    },
    // 登录
    logins({ commit },data) {
      commit("login",data)
    },
    playlist(context, { data, index }) {
      // 获取音乐url
      context.dispatch("getdata", { data, index })
      context.commit("playlist", { data, index })
    },
    getdata({ commit }, { data, index }) {
      getMusicUrl({ id: data[index].id }).then((datalist) => {
        let data = datalist.data[0].url
        let name = "playurl"
        commit("set", { data, name })
      });
      // 获取歌曲详情
      getMusicDatailed({ ids: data[index].id }).then((datalist) => {

        let data = datalist.songs
        let name = "song"
        commit("set", { data, name })

      });

      // 获取歌词
      getMusicLyric({ id: data[index].id }).then((datalist) => {
        // console.log("歌词", data);
        let data1 = datalist.lrc.lyric.split("\n");
        data1.pop();
        let data = []
        for (let i = 0; i < data1.length; i++) {
          let obj = {};
          let data1ll = data1[i].split("]");
          let time = data1ll[0].substr(1, data1ll[0].length - 1).split(":");
          let min = time[0];
          let s = time[1];
          obj.time = parseInt(min) * 60 + Math.ceil(s);
          // console.log(obj.time);
          obj.time = parseInt(time[0]) * 60 + Math.ceil(time[1]);
          obj.text = data1ll[1];
          data.push(obj);
        }
        let name = "lrc"
        commit("set", { data, name })
        // this.getlrcdata(data.lrc.lyric);
        // this.lrc = data.lrc;
      });
    },
    // 下一首
    nextplay({ commit, dispatch, state }) {
      commit("nextplay")
      let data = state.playlists
      let index = state.playindex
      dispatch("getdata", { data, index })
    },
    // 上一首
    upplay({ commit, dispatch, state }) {
      commit("upplay")
      let data = state.playlists
      let index = state.playindex
      dispatch("getdata", { data, index })
    },
    // 删除此首
    delplaylist({ commit, dispatch, state }, index1) {
      commit("delplaylist", index1)
      let data = state.playlists
      let index = state.playindex
      dispatch("getdata", { data, index })

    },
    // 清除列表
    clearplaylist({ commit }) {
      commit("clearplaylist")
    },
    // 选择播放的歌曲
    amendindex({ commit, dispatch, state }, index1) {
      commit("amendindex", index1)
      let data = state.playlists
      let index = state.playindex
      dispatch("getdata", { data, index })
    },
    addhistory({ commit }, data) {
      commit("ADDhistory", data)
    },
    clearhistory({ commit }) {
      commit("CLEARhistory")
    },
    del({ commit }, index) {
      commit("DELhistory", index)
    }
  },
  modules: {

  },
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })]
})
