import axios from 'axios'

let request = axios.create({
    baseURL: import.meta.env.VITE_SERVER + import.meta.env.VITE_APP_BASE_API,
    timeout: 5000
})

request.interceptors.request.use((config) => {
    // config配置对象中的一个重要属性 headers 请求头, 通常用来给服务其携带公共参数
    return config
})

request.interceptors.response.use((response) => {
    return response.data // 简化请求回来的数据
}, (error) => {
    // 失败回调：处理 http 网络错误
    let message = ''
    let status = error.response.status
    switch (status) {
        case 401:
            message="身份验证过期，请重新登录"
            break
        case 403:
            message="你无权访问"
            break
        case 404:
            message="资源没有找到"
            break
        case 500:
            message="服务器出现故障"
    }

    return Promise.reject(error) // 终结 Promise 链
})

export default request
