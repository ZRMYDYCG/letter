<template>
  <div
    class="chat-start-card bg-transparent shadow-md max-w-[90vw] mx-auto rounded-md md:mt-[10vh] p-5 flex flex-col items-center"
  >
    <div class="question-hint flex justify-between items-center w-full">
      <div class="change-btn flex items-center">
        <iconpark-icon
          name="transform"
          :class="{ 'rotate-animation': isRotating }"
          class="w-7 mx-2"
        ></iconpark-icon>
        <span @click="rendomData('2')" class="text-indigo-600 cursor-pointer">换一换</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const problemData = [
  {
    icon: 'https://example.com/icon1.png',
    title: '农夫山泉新品上市策略'
  },
  {
    icon: 'https://example.com/icon2.png',
    title: '2024电动汽车年中大盘点'
  }
]

const newData = ref([])
const isRotating = ref<boolean>(false)

const rendomData = (type: string) => {
  if (type === '2') {
    if (isRotating.value) return
    isRotating.value = true
    setTimeout(() => {
      isRotating.value = false
    }, 1000)
  }
  newData.value = [...problemData].sort(() => Math.random() - 0.5).slice(0, 4)
}

onMounted(() => {
  rendomData('1')
})
</script>

<style scoped>
.rotate-animation {
  transition: transform 1s;
  transform: rotate(360deg);
}
</style>
