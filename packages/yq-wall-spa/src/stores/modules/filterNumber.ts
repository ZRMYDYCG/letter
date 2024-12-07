import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFilterNumberStore = defineStore('filterNumber', () => {
  const filterNumber = ref<number | null>(null)

  const changeFilterNumber = (val: any) => {
    filterNumber.value = val
  }

  return {
    filterNumber,
    changeFilterNumber
  }
})
