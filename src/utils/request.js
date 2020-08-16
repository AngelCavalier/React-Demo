import axios from "axios";
//antd
import { message } from "antd"
//cookies
import { getToken, getUsername } from "./cookies";
//第一步，创建实例
const service = axios.create({
    baseURL: process.env.REACT_APP_API,
    timeout: 5000,
});

//第二步，请求拦截 （请求头）

service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么 Token,Username
    config.headers["Token"] = getToken();
    config.headers["Username"] = getUsername();
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});


//第三步，响应拦截 （响应头）

service.interceptors.response.use(function (response) { // http 状态为200
    // 对响应数据做点什么
    const data = response.data;
    if (data.resCode !== 0) {   //resCode不成功，全局的错误拦截
        message.info(data.message)
    } else {//resCode成功
        return response;
    }
}, function (error) { // http状态不为200
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default service;