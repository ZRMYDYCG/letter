import { Ref, Reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { useCommonStore } from '@/stores/modules/common'

export function useLabelFilter(
  isLoading: Ref<boolean>,
  textList: Ref<any>,
  photoList: Ref<any>,
  messageParams: Reactive<any>,
  fn?: any
) {
  const commonStore = useCommonStore()
  const { currentWall } = storeToRefs(commonStore)

  const changeLabelItem = async (params: any) => {
    // 开启 Loading
    isLoading.value = true

    // 基于当前墙体重置结果列表和搜索条件
    const resetListsAndParams = () => {
      if (currentWall.value === 0) {
        textList.value = []
      } else if (currentWall.value === 1) {
        photoList.value = []
      }

      messageParams.page = 1
      messageParams.pageSize = 10
      messageParams.tag = params.label
      messageParams.sortBy = params.sortBy

      // 处理副作用
      if (fn) {
        fn()
      }
    }

    const fetchMessagesAndCloseDrawer = async () => {
      isLoading.value = false // 关闭 Loading
    }

    resetListsAndParams()
    await fetchMessagesAndCloseDrawer()
  }

  return {
    changeLabelItem
  }
}
