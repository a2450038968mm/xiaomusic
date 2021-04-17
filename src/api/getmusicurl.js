import request from "./http"

// 获取音乐url
export function getMusicUrl(params){
  return request({
      url:"/song/url",
      method:"get",
      params
  })
}

// 获取音乐详情
export function getMusicDatailed(params){
  return request({
      url:"/song/detail",
      method:"get",
      params
  })
}


// 获取音乐详情
export function getMusicLyric(params){
  return request({
      url:"/lyric",
      method:"get",
      params
  })
}
