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
  }

  const login = async (response: any) => {
    localStorage.setItem('userInfo', JSON.stringify(response))
    userInfo.value = response.user
    token.value = response.token
    await router.push('/')
  }

  return {
    token,
    userInfo,
    logout,
    login,
    id
  }
})

export default useAuthStore
