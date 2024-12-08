<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DPlayer from 'dplayer'
import { useLockScroll } from '@/hook'

const props = defineProps<{
  videoUrl?: string
  posterUrl?: string
}>()

useLockScroll()

const player = ref<HTMLElement | null>(null)
const dp = ref<DPlayer | null>(null)

const initPlayer = () => {
  dp.value = new DPlayer({
    /**
     *  在左上角展示一个 logo
     * */
    logo: '/public/logo.svg',
    /**
     *  可选的播放速率，可以设置成自定义的数组
     * */
    playbackSpeed: [0.5, 0.75, 1, 1.25, 1.5, 2],
    /**
     *  开启热键，支持快进、快退、音量控制、播放暂停
     * */
    hotkey: true,
    /**
     * 是否自动播放
     * */
    autoplay: true,
    /**
     * 是否循环播放
     * */
    loop: true,
    /**
     * 视频播放器的容器
     * */
    container: player.value,
    /**
     * 是否开启屏幕截屏功能
     * */
    screenshot: true,
    video: {
      /**
       * 视频播放地址
       * */
      url: props.videoUrl,
      /**
       * 视频第一帧的封面图
       * */
      pic: 'https://pic4.zhimg.com/v2-e28b1b2ca8b5ffe1fe9fbf296ac447e1_r.jpg'
    }
  })
}

onMounted(() => {
  initPlayer()
})
</script>

<template>
  <div ref="player"></div>
</template>

<style scoped>
.dplayer {
  width: 90vw;
  height: 100%;
  margin: auto;
  z-index: 2;
}
.dplayer .dplayer-video-wrap {
}

.dplayer .dplayer-video-wrap .dplayer-video {
}

.dplayer .dplayer-video-wrap .dplayer-video-current {
}

.dplayer .dplayer-video-wrap .dplayer-logo {
}
</style>
