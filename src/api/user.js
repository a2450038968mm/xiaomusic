import request  from "./http";



// 获取喜欢的音乐
export function getlike(params) {
  return request({
      url:"/likelist",
      method:"get",
      params
  })
}


//获取歌曲详情
export function getsongs(params) {
  return request({
      url:"/song/detail",
      method:"get",
      params
  })
}

//获取播放记录
export function gethisplay(params) {
  return request({
      url:"/user/record",
      method:"get",
      params
  })
}

//退出登录
export function exitlogin(params) {
  return request({
      url:"/logout",
      method:"get",
      params
  })
}


