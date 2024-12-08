<template>
  <div
    @click="$emit('click')"
    class="relative w-full overflow-hidden shadow-lg rounded-lg cursor-pointer dark:text-white"
  >
    <div class="overflow-hidden">
      <img
        :src="videoUrl"
        alt="Video Thumbnail"
        class="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
        @mouseover="showDetails = true"
        @mouseleave="showDetails = false"
      />
    </div>
    <div
      class="absolute top-0 right-0 p-2 z-10 transition-opacity duration-300"
      :class="{ 'opacity-0': !showDetails }"
      @mouseover="showDetails = true"
    >
      <img src="@/assets/images/class.svg" alt="Watch Later" class="h-6 w-6" />
    </div>
    <div
      class="absolute flex justify-between px-2 bottom-[78px] left-0 right-0 text-white transition-opacity duration-300"
      :class="{ 'opacity-0': !showDetails }"
    >
      <span class="text-sm">播放量: {{ views }} | 评论数: {{ comments }}</span>
      <span class="text-sm">时长: {{ duration }}</span>
    </div>
    <div class="p-4 dark:bg-gray-800 dark:opacity-40">
      <h2 class="text-lg font-semibold truncate">{{ title }}</h2>
      <p class="text-gray-700 dark:text-gray-300 text-sm truncate">{{ description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'

const props = defineProps<{
  title?: string
  description?: string
  videoUrl?: string
  duration?: string
  views?: number
  comments?: number
}>()

const showDetails = ref(false)
</script>

<style scoped></style>
