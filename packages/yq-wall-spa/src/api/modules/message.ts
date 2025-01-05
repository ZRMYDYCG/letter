import axios from '../index'

/*
 * @desc 获取留言列表 / 查看某条留言详情
 * **/
export const getMessages = (params: any) => {
  return axios.get<any>('/message/list', params)
}

/*
 * @desc 新增文本留言
 * **/
export const addMessage = (params: any) => {
  return axios.post<any>('/message', params)
}

/**
 * @desc 新增照片留言
 * */
export const addPhotoMessage = (params: any) => {
  return axios.post<any>('/upload/img-message', params)
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

/**
 * @desc 给某条回复追加回复
 * */
export const appendMessageComment = (params: any) => {
  return axios.post<any>('/comment/reply', params)
}
