/**
 * TODO: fix 获取组件内定义的 ref 数组
 * */

import { getCurrentInstance, nextTick, ref } from 'vue'

export function useRefs() {
  const instance = getCurrentInstance()
  if (!instance) {
    throw new Error('useRefs must be called inside setup()')
  }

  const refs = ref({})

  const getRefs = async () => {
    await nextTick()
    refs.value = instance.refs
    return refs.value
  }

  // 直接暴露 refs 和 getRefs 方法
  return { refs, getRefs }
}
