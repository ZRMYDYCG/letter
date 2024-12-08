<script setup lang="ts">
import { Vue3Lottie } from 'vue3-lottie'
import loadingScreen from '@/assets/json/loading-screen.json'
</script>

<template>
  <div class="relative pt-[52px] text-[16px] h-[100vh] w-full">
    <Vue3Lottie
      class="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2"
      :animationData="loadingScreen"
      :height="500"
      :width="380"
    />
    <div
      class="absolute top-[60%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-center dark:text-white"
    >
      正在加速开发中...
    </div>
  </div>
</template>

<style scoped></style>
