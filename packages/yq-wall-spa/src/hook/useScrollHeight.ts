import { ref } from 'vue'
import { useEventListener } from '@vueuse/core'

export function useScrollHeight(onFn?: () => void) {
  const scrollTop = ref(0) // 滚动条距离顶部的高度
  const clientHeight = ref(0) // 屏幕高度
  const scrollHeight = ref(0) // 可滚动的内容高度

  const updateScrollValues = () => {
    scrollTop.value = document.documentElement.scrollTop || document.body.scrollTop
    clientHeight.value = document.documentElement.clientHeight
    scrollHeight.value = document.documentElement.scrollHeight

    // 处理副作用
    if (onFn) {
      onFn()
    }
  }

  useEventListener(window, 'scroll', updateScrollValues)

  // 初始化时更新一次值
  updateScrollValues()

  return {
    scrollTop,
    clientHeight,
    scrollHeight
  }
}
