import { ref } from 'vue'

export function useThrottle(callback: Function, delay: number) {
  const isThrottled = ref(false)
  return (...args: any) => {
    if (!isThrottled.value) {
      isThrottled.value = true
      callback(...args)
      setTimeout(() => {
        isThrottled.value = false
      }, delay)
    }
  }
}
