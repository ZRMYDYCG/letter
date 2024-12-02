import { createPinia, defineStore } from 'pinia'

export const useGlobalStore = defineStore('GlobalState', {
  state: () => ({
    userInfo: {}
  }),
  getters: {},
  actions: {}
})

const pinia = createPinia()

export default pinia
