import { Ref, watch } from 'vue'

export function useResetOnChange<T>(target: Ref<T>, resetFn: () => void) {
  watch(target, async () => {
    resetFn()
  })
}
