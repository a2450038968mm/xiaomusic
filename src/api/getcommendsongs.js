import request from "./http"

// 获取音乐url
export function getcommendsongs(params){
  return request({
      url:"/personalized/newsong",
      method:"get",
      params
  })
}