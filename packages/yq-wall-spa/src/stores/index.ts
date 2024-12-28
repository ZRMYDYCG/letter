import { createPinia, defineStore } from 'pinia'

export const useGlobalStore = defineStore('GlobalState', {
  state: () => ({}),
  getters: {},
  actions: {}
})

const pinia = createPinia()

export default pinia
