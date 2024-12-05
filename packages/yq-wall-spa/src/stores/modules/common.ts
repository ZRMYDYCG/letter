import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCommonStore = defineStore('common', () => {
  const currentWall = ref(0)
  const themeType = ref('light')

  /**
   * 墙体切换
   * */
  const changeWall = (val: number) => {
    currentWall.value = val
  }

  /**
   * 主题切换
   * */
  const changeThemeType = (newThemeType: any) => {
    themeType.value = newThemeType
  }

  return {
    currentWall,
    changeWall,
    themeType,
    changeThemeType
  }
})
