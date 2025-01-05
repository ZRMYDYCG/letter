import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const useAuthStore = defineStore('authStore', () => {
  const router = useRouter()

  let token = ref(JSON.parse(localStorage.getItem('userInfo') || '{}')?.token || '')
  let userInfo: any = ref(JSON.parse(localStorage.getItem('userInfo') || '{}')?.user || '')
  let id = ref(
    JSON.parse(localStorage.getItem('userInfo') || '{}')?.user?._id || '676fda5760b243521bed91ef' // 默认是超级管理员的id
  )

  const logout = () => {
    localStorage.removeItem('userInfo')
    token.value = ''
    id.value = '676fda5760b243521bed91ef'
  }

  const login = async (response: any) => {
    localStorage.setItem('userInfo', JSON.stringify(response))
    userInfo.value = response.user
    token.value = response.token
    id.value = response.user._id
    await router.push('/')
  }

  const setUserInfo = async (params: any) => {
    localStorage.setItem('userInfo', JSON.stringify(params))
    userInfo.value = params.user
    token.value = params.token
    id.value = params.user._id
  }

  return {
    token,
    userInfo,
    logout,
    login,
    setUserInfo,
    id
  }
})

export default useAuthStore
