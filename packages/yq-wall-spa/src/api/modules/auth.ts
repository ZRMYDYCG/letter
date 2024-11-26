import axios from '../index'

namespace Login {
  // 用户登录表单
  export interface LoginReqForm {
    username: string
    password: string
  }
  // 登录成功后返回的 token
  export interface LoginResData {
    token: string
  }
}

export const login = (params: Login.LoginReqForm) => {
    return axios.post<Login.LoginResData>('/auth/login', params)
}
