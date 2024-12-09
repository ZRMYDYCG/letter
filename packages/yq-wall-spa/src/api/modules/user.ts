import axios from '../index'

export const getUserInfo = (params: any) => {
  return axios.get<any>('/user', params)
}
