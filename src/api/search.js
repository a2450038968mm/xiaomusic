import request  from "./http";



// 热门搜索
export function getHotSearch(params){
  return request({
      url:"/search/hot/detail",
      method:"get",
      params
  })
}


// 搜索建议
export function getSearchActive(params){
  return request({
      url:"/search/suggest",
      method:"get",
      params
  })
}


// 搜索
export function getSearch(params){
  return request({
      url:"/search",
      method:"get",
      params
  })
}