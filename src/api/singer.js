import request  from "./http";



// 获取歌手
export function getArtistLists(params){
  return request({
      url:"/artist/list",
      method:"get",
      params
  })
}

// 热门歌手
export function getTopArtistLists(params){
  return request({
      url:"/top/artists",
      method:"get",
      params
  })
}



