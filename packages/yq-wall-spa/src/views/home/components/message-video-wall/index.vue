<template>
    <div>
      <div class="mx-auto px-4 sm:px-6 lg:px-8 mt-[65px]">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2">
          <video-item
            v-for="(video, index) in videos"
            :key="index"
            :title="video.title"
            :description="video.description"
            :videoUrl="video.url"
            @click="playVideo('/api/test.mp4')"
          />
        </div>
      </div>
      <!-- 播放器面板 -->
      <player-panel :visible="isPlayerVisible" :videoUrl="currentVideoUrl" @close="closePlayer" />
      <button @click="closePlayer">关闭</button>
    </div>
<!--  <div class="relative pt-[52px] text-[16px] h-[100vh] w-full">-->
<!--    <Vue3Lottie-->
<!--      class="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2"-->
<!--      :animationData="loadingScreen"-->
<!--      :height="500"-->
<!--      :width="380"-->
<!--    />-->
<!--    <div-->
<!--      class="absolute top-[60%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-center dark:text-white"-->
<!--    >-->
<!--      正在加速开发中...-->
<!--    </div>-->
<!--  </div>-->
</template>

<script setup lang="ts">
import { ref } from 'vue'
import videos from './components/data.json'
import VideoItem from './components/video-item.vue'
import PlayerPanel from './components/player-panel.vue'

const isPlayerVisible = ref(false)
const currentVideoUrl = ref('')

function playVideo(url: string) {
  currentVideoUrl.value = url
  isPlayerVisible.value = true
}

function closePlayer() {
  isPlayerVisible.value = false
}
// import { Vue3Lottie } from 'vue3-lottie'
// import loadingScreen from '@/assets/json/loading-screen.json'
</script>

<style scoped></style>
