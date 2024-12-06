<script setup lang="ts">
import { Vue3Lottie } from 'vue3-lottie'
import loadingScreen from '@/assets/json/loading-screen.json'
</script>

<template>
  <div>
    <Vue3Lottie :animationData="loadingScreen" :height="100" :width="100" />
    <div class="text-center mt-2 text-[16px] text-gray-500">加载中...</div>
  </div>
</template>

<style scoped></style>
