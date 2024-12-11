import axios from '../index'

export const login = (params: any) => {
  return axios.post<any>('/auth/login', params)
}

export const register = (params: any) => {
  return axios.post<any>('/auth/register', params)
}
