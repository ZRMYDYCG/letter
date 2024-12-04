import { ref } from 'vue'

export function useScrollToTop() {
  const isScrolling = ref(false) // 控制滚动状态

  const toWallTop = () => {
    isScrolling.value = true // 正在滚动状态
    window.scrollTo({ top: 0, behavior: 'smooth' })

    setTimeout(() => {
      isScrolling.value = false // 恢复状态
    }, 400)
  }

  return {
    isScrolling,
    toWallTop
  }
}
