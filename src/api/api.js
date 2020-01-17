import axios from 'axios'
import { Message } from 'element-ui'

//请求拦截
axios.interceptors.request.use(config => {
    console.log("interceptors");
    return config;
}, err => {
    Message.error({ message: '请求超时!' });
    // return Promise.resolve(err);
})

//响应拦截
axios.interceptors.response.use(rsp => {
    if (rsp.status && rsp.status == 200 && rsp.data.status == 500) {
        Message.error({ message: rsp.data.msg });
        return;
    }
    if (rsp.data.msg) {
        Message.success({ message: rsp.data.msg });
    }
    return rsp;
}, err => {
    Message.error({ message: err.message });
})

export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: url,
        baseURL: 'localhost:8080/',
        data: params,
        transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}