import { ref, reactive } from 'vue'
import { getMessages } from '../api/modules'

export interface IGetMessageParams {
  userId: string | number
  page: number
  pageSize: number
  tag: number | null
  type: number
}

export function useGetMessages(currentWall: any) {
  const isLoading = ref(false) // 加载状态

  const messageParams = reactive<IGetMessageParams>({
    userId: JSON.parse(localStorage.getItem('userInfo') || '{}')._id || 0,
    page: 1,
    pageSize: 10,
    tag: null,
    type: currentWall
  })

  const textList = ref<any>([]) // 文本留言列表
  const photoList = ref<any>([]) // 照片留言列表
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
       */
      switch (messageParams.type) {
        case 0:
          // 文本墙
          textList.value.push(...res.data)
          break
        case 1:
          // 照片墙
          photoList.value.push(...res.data)
          break
        case 2:
          // 视频留言墙
          break
        case 3:
          // 音频留言墙
          break
        case 4:
          // 链接墙
          break
        case 5:
          // 问答墙
          break
        case 6:
          // 公告墙
          break
        default:
          console.warn('未知的留言墙类型')
          break
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
