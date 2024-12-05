import type { Ref } from 'vue'
import { watch } from 'vue'

export interface IResetOnChange {
  isDrawerShow: boolean
  bigPhotoPreview: boolean
  currentIndex: number
  DownloadImgUrl: string
  textList: any[]
  photoList: any[]
  messageParams: any
}

export function useResetOnChange<T>(target: Ref<T>, resetFn: () => void) {
  watch(target, async () => {
    if (!resetFn) return
    resetFn()
  })
}
