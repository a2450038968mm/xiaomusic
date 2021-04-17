<template>
  <div>
      <div class="loading" v-if="isload" >
      <van-loading type="spinner" color="#1989fa" />
    </div>
    <div class="list" v-for="(item,index) in rank" :key="index">
      <div class="img">
        <img :src="item.url" alt="" />
      </div>
      <div class="paihang">
        <ul>
          <li v-for="(val,key) in item.tracks" :key="key" @click="gosonglist(id[index])">
            {{key+1}}.{{val.al.name }}-{{ val.ar[0].name}}
          </li>
          
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getBanner } from "../api/recommend";
export default {
  data() {
    return {
      isload:true,
      rank:[],
      id:[]
    }
  },
  beforeRouteEnter (to, from, next) {
    getBanner("toplist").then(data=>{
      // console.log(data);
        next(vm=>{
      vm.getdata(data);
    })
    })
   
  },
   created(){
    setTimeout(() => {
        this.isload=false
    }, 3000);
  },
 
  methods:{
    gosonglist(id){
       this.$router.push({path:"/songlist",query:{id,type:"songlist"}})
    },
    getdata(data){
      for(let i = 0 ; i < data.list.length ; i++){
        getBanner("playlist/detail?id="+data.list[i].id).then(aaa=>{
          this.id.push(data.list[i].id)
          this.rank.push({url:aaa.playlist.coverImgUrl,tracks:aaa.playlist.tracks.slice(0,3)})
      })
      }
    
    }
  }
}
</script>


<style scoped lang="less">
.list {
  margin-top: 5px;
  width: 97%;
  margin: 0 auto;
  display: flex;
  padding: 5px;
  border-bottom: 1px solid #e1e2e2;
  .img {
    width: 175px;

    img {
      width: 100%;
      border-radius: 5px;
    }
  }
  .paihang {
    height: 175px;
    padding-left: 15px;
    width: 400px;
    ul li{
      line-height: 55px;
      width: 100%;
      overflow: hidden;
       display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      height: 55px;
      font-size: 26px;
    }
  }
}
.loading{
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 10000;
  background: rgba(255, 255, 255, 0.7);
  padding: 45%;
}
</style>