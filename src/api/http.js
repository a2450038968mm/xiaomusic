import axios from "axios";


// 创建axios实例化
const  service = axios.create({
    baseURL:"http://39.105.39.45:3000",
    timeout:30000000,//请求超时时间
    headers:{
        "Content-Type":"application/json;charset=UTF-8" //表单数据传递转化
    }
})
// http://api.bilibili.com/x/web-interface/search/all/v2

// request 拦截器 发送数据到后台
service.interceptors.request.use(
    config => {
        console.log(config);
        return config;
    },
    error =>{
        console.log(error);
        Promise.reject(error);
    }
)


// response 拦截器 获取后台数据拦截
service.interceptors.response.use(
    response => {
        return response.data;
    },
    error =>{
        console.log(error);
        return Promise.reject(error);
    }
)



export default service;