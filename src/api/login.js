import request from "./http"

// 获取验证码
export function getlogin(params) {
    return request({
        url:"login/cellphone",
        method:"get",
        params
    })
}


// 验证验证码
export function getislogin(params) {
    return request({
        url:"/login/status",
        method:"get",
        params
    })
}
