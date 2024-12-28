import axios from '../index'

export const getUserInfo = (params: any) => {
  return axios.get<any>('/user', params)
}

export const updateUserInfo = (id: any, formData: any) => {
  return axios.post<any>(`/upload/img-user-profile/${id}`, formData)
}
