import Vue from 'vue'
import axios from 'axios'
import {getToken,removeToken} from '@/utails/token.js'
import router from '@/router'
//基地址
axios.defaults.baseURL='http://127.0.0.1/heimamm/public'
//允许携带cookie
axios.defaults.withCredentials=true

// 设置请求拦截器
axios.interceptors.request.use(function(config){
    // console.log('----------',config);
    const token=getToken()
    if(token){
        config.headers.token=token
    }
    return config
},function(err){
    console.log(err);
    return Promise.reject(err)
})
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // console.log("-------------",response);
    if(response.data.code===206){
        //token 过期没用了移除
        removeToken()
        //跳转页面
        router.push('/login')
    }
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
Vue.prototype.$axios=axios