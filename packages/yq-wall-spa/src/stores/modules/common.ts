import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCommonStore = defineStore('common', () => {
  const currentWall = ref(-1)
  const themeType = ref(localStorage.getItem('themeType') || 'light')

  /**
   * 墙体切换
   * */
  const changeWall = (val: number) => {
    currentWall.value = val
  }

  /**
   * 主题切换
   * */
  const changeThemeType = (newThemeType: string) => {
    themeType.value = newThemeType
    localStorage.setItem('themeType', newThemeType)
  }

  return {
    currentWall,
    changeWall,
    themeType,
    changeThemeType
  }
})
