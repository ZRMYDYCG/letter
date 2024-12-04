import { ref, reactive } from 'vue'
import { getMessages } from '../api/modules'

export function useGetMessages(currentWall: any) {
  const isLoading = ref(false) // 加载状态
  const messageParams = reactive({
    userId: JSON.parse(localStorage.getItem('userInfo') || '{}')._id || 0,
    page: 1,
    pageSize: 10,
    tag: '',
    type: currentWall
  })

  const textList = ref([]) // 文本留言列表
  const photoList = ref([]) // 照片留言列表
  const messageTotal = ref(0) // 留言总数

  const fetchMessages = async () => {
    try {
      isLoading.value = true
      const res = await getMessages(messageParams)
      /**
       * 0 文本留言墙
       * 1 照片留言墙
       * 2 视频留言墙
       * 3 音频留言墙
       * 4 链接墙
       * 5 问答墙
       * 6 公告墙
       * */
      if (currentWall === 0) {
        ;(textList.value as any).push(...res.data)
      } else {
        ;(photoList.value as any).push(...res.data)
      }
      messageTotal.value = (res as any).meta.total
    } catch (error) {
      console.error(error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    textList,
    photoList,
    messageTotal,
    fetchMessages,
    messageParams
  }
}
