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


/*
* @desc 获取留言的评论列表
* **/
export const getMessageComments = (params: any) => {
    return axios.get<any>('/comment', params)
}

/*
* @desc 新增留言的评论
* */
export const addMessageComment = (params: any) => {
    return axios.post<any>('/comment', params)
}

/*
* @desc 留言点赞
* **/
export const likeMessage = (params: any) => {
    return axios.post<any>('/message/like', params)
}

/*
* @desc 留言取消点赞
* **/
export const unlikeMessage = (params: any) => {
    return axios.post<any>('/message/unlike', params)
}
