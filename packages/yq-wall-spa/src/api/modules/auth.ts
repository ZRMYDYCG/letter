import axios from '../index'

export const login = (params: any) => {
    return axios.post<any>('/auth/login', params)
}
