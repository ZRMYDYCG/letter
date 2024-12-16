import { ref } from 'vue'
import { useEventListener } from '@vueuse/core'

export function useGridTemplate() {
  const getGridTemplateColumns = () => {
    let screenWidth = document.body.clientWidth
    if (screenWidth >= 1200) {
      return 'repeat(5, 1fr)' // 大屏幕：五个一行
    } else if (screenWidth >= 900) {
      return 'repeat(4, 1fr)' // 中屏幕：四个一行
    } else if (screenWidth >= 600) {
      return 'repeat(2, 1fr)' // 小屏幕：两个一行
    } else {
      return '1fr' // 超小屏幕：一个一行
    }
  }

  const gridTemplateColumns = ref(getGridTemplateColumns())

  useEventListener(window, 'resize', () => {
    gridTemplateColumns.value = getGridTemplateColumns()
  })
  gridTemplateColumns.value = getGridTemplateColumns()
  return {
    gridTemplateColumns
  }
}
