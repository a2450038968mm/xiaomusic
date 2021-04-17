import request from "./http"

// 获取网易出品mv
export function getMvlist(params){
  return request({
      url:"/mv/exclusive/rcmd",
      method:"get",
      params
  })
}

// 获取网易出品mv地址
export function getMvurl(params){
  return request({
      url:"/mv/url",
      method:"get",
      params
  })
}