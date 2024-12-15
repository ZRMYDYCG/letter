import { defineStore } from 'pinia'

const useAuthStore = defineStore('authStore', {
  state: () => ({
    token: ''
  })
})

export default useAuthStore
