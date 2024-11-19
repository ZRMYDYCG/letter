import { defineStore } from 'pinia'

export const useHomeStore = defineStore('homeStore', {
    state: () => ({
        count: 0,
    }),
    actions: {
        increment() {
            this.count++
        }
    }
})
