import { ref, watchEffect } from 'vue'

export function useChangeTitle(initialTitle: string) {
  const title = ref(initialTitle)

  watchEffect(() => {
    document.title = title.value
  })

  const changeTitle = (newTitle: string) => {
    title.value = newTitle
  }

  return {
    title,
    changeTitle
  }
}
