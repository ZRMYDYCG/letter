import { ref } from 'vue'
import { getMessages } from '../api/modules'
import { useScrollToTop } from './useScrollToTop.ts'

export function useAddMessage() {
  const isDrawerShow = ref(false) // 抽屉的显示状态
  const textList = ref([]) // 文本留言列表
  const photoList = ref([]) // 照片留言列表
  const { toWallTop } = useScrollToTop()

  const toggleDrawer = () => {
    isDrawerShow.value = !isDrawerShow.value
  }

  const fetchNewMessage = async (userId: string, type: 'text' | 'photo') => {
    const res = await getMessages({
      userId,
      page: 1,
      pageSize: 1,
      tag: ''
    })

    if (type === 'text') {
      ;(textList.value as any).unshift(res.data[0])
    } else if (type === 'photo') {
      ;(photoList.value as any).unshift(res.data[0])
    }
  }

  const handleAddSuccess = async (val: string, userId: string) => {
    toggleDrawer()
    await fetchNewMessage(userId, val === 'add-text-success' ? 'text' : 'photo')
    toWallTop()
  }

  return {
    isDrawerShow,
    handleAddSuccess
  }
}
