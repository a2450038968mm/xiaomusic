import request  from "./http";



// 获取歌单详情
export function getArtistLists(params){
  return request({
      url:"/playlist/detail",
      method:"get",
      params
  })
}

// 获取歌单评论
export function getCommentLists(params){
  return request({
      url:"/comment/playlist",
      method:"get",
      params
  })
}


// 获取歌手单曲
export function getSingerlist(params){
  return request({
      url:"/artists",
      method:"get",
      params
  })
}