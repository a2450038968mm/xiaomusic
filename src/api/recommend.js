import request from "./http"

export function getBanner(banner) {
  return request({
    url: "/"+banner,
    method: "get",
  })
}
