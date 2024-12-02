import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCommonStore = defineStore('common', () => {
  const currentWall = ref('0')

  const changeWall = (val: string) => {
    currentWall.value = val
  }

  return {
    currentWall,
    changeWall
  }
})
