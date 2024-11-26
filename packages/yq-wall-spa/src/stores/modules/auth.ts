import { defineStore } from 'pinia'

const useAuthStore = defineStore('authStore', {
    state: () => ({
        token: localStorage.getItem( 'token') || '',
    })
})

export default useAuthStore
