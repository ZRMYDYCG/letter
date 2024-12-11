import { defineStore } from 'pinia'

const useAuthStore = defineStore('authStore', {
  state: () => ({
    token: JSON.parse(<string>localStorage.getItem('userInfo')).token || ''
  })
})

export default useAuthStore
