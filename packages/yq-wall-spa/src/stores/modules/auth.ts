import { defineStore } from 'pinia'

const useAuthStore = defineStore('authStore', {
  state: () => {
    const userInfo = localStorage.getItem('userInfo')
    let token = ''

    if (userInfo) {
      try {
        const parsedUserInfo = JSON.parse(userInfo)
        token = parsedUserInfo.token || ''
      } catch (e) {
        console.error('Failed to parse userInfo from localStorage:', e)
      }
    }

    return {
      token
    }
  }
})

export default useAuthStore
