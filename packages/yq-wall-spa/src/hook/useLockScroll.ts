import { onMounted, onBeforeUnmount } from 'vue'

export function useLockScroll() {
  onMounted(() => {
    document.body.style.overflow = 'hidden' // 锁定 body 滚动
  })

  onBeforeUnmount(() => {
    document.body.style.overflow = '' // 恢复 body 滚动
  })
}
