<template>
  <div class="chat-start-card p-5 max-w-[95vw] mx-auto">
    <div class="question-hint flex justify-end items-center mb-4">
      <div class="change-btn flex items-center">
        <iconpark-icon
          name="transform"
          :class="{ 'rotate-animation': isRotating }"
          class="mr-1"
        ></iconpark-icon>
        <span @click="rendomData('2')" class="text-indigo-600 cursor-pointer">换一换</span>
      </div>
    </div>

    <div class="flex flex-wrap justify-center">
      <template v-for="(item, index) in newData" :key="index">
        <div class="bg-white m-2 p-2 rounded-md border cursor-pointer max-w-[200px] flex-grow">
          {{ item.title }}
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const problemData = [
  {
    icon: '',
    title: '农夫山泉新品上市策略'
  },
  {
    icon: '',
    title: '2024电动汽车年中大盘点'
  },
  {
    icon: '',
    title: '活动方案策划'
  },
  {
    icon: '',
    title: '申论备考干货汇总'
  },
  {
    icon: '',
    title: '运用创意思维解决问题'
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
  newData.value = [...problemData].sort(() => Math.random() - 0.5).slice(0, 5)
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
