<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Vue3Lottie } from 'vue3-lottie'
import loadingScreen from '@/assets/json/loading-screen.json'
import DPlayer from 'dplayer'

const player = ref<HTMLElement | null>(null)
const dp = ref<DPlayer | null>(null)

const initPlayer = () => {
  dp.value = new DPlayer({
    container: player.value,
    screenshot: true,
    video: {
      url: 'http://localhost:5174/test.mp4'
    }
  })
}

onMounted(() => {
  initPlayer()
})
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

  <div ref="player"></div>
</template>

<style lang="scss" scoped></style>
