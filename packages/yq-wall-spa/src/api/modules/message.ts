import axios from '../index'

/*
* @desc 获取留言列表
* **/
export const getMessages = (params: any) => {
    return axios.get<any>('/message', params)
}

/*
* @desc 新增留言
* **/
export const addMessage = (params: any) => {
    return axios.post<any>('/message', params)
}
