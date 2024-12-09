import { ref } from 'vue'
import { defineStore } from 'pinia'
import { defaultSettings } from '@/config'

export const useCommonStore = defineStore('common', () => {
  /**
   * 当前墙体
   * */
  const currentWall = ref(2)
  /**
   * 墙体切换
   * */
  const changeWall = (val: number) => {
    currentWall.value = val
  }

  /**
   * 黑夜、白天模式
   * */
  const themeType = ref(localStorage.getItem('themeType') || 'light')
  /**
   * 主题切换
   * */
  const changeThemeType = (newThemeType: string) => {
    themeType.value = newThemeType
    localStorage.setItem('themeType', newThemeType)
  }

  /**
   * 项目配置
   * */
  const settings = ref<any>(
    JSON.parse(localStorage.getItem('settings') || JSON.stringify(defaultSettings))
  )

  return {
    currentWall,
    changeWall,
    themeType,
    changeThemeType,
    settings
  }
})
