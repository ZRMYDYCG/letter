import { Ref } from 'vue'
import { getMessages } from '../api/modules'
import { useScrollToTop } from './useScrollToTop.ts'

export function useAddMessage(
  isDrawerShow: Ref<boolean>,
  textList: Ref<any[]>, // 文本留言列表
  photoList: Ref<any[]> // 照片留言列表
) {
  const { toWallTop } = useScrollToTop()

  const fetchNewMessage = async (userId: string, type: 'text' | 'photo') => {
    const res = await getMessages({
      userId,
      page: 1,
      pageSize: 1,
      tag: ''
    })

    if (type === 'text') {
      textList.value.unshift(res.data[0])
    } else if (type === 'photo') {
      photoList.value.unshift(res.data[0])
    }
  }

  const handleAddSuccess = async (val: string, userId: string) => {
    isDrawerShow.value = !isDrawerShow.value
    await fetchNewMessage(userId, val === 'add-text-success' ? 'text' : 'photo')
    toWallTop()
  }

  return {
    handleAddSuccess
  }
}
