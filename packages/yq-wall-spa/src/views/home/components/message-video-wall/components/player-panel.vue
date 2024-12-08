<script setup lang="ts">
import { ref } from 'vue'
import VideoPlayer from './video-player.vue'
const bgUrl = ref('https://pic.imgdb.cn/item/6755d7d9d0e0a243d4e00c6e.png')
import YqDrawer from '@/components/yq-drawer/index.vue'

const props = defineProps<{
  visible: boolean
  videoUrl: string
}>()
</script>

<template>
  <transition name="slide-fade">
    <div
      v-if="visible"
      class="player-panel fixed bottom-0 left-0 w-full h-[calc(100%-52px)] z-[9999]"
      :style="{ backgroundImage: `url(${bgUrl})` }"
    >
      <div class="w-full h-full">
        <video-player :videoUrl="videoUrl" />
      </div>
      <!--  关闭按钮  -->
      <button @click="$emit('close')" class="absolute top-0 right-0 m-2 text-white z-[2]">
        关闭
      </button>
      <!--   毛玻璃背景   -->
      <div class="overlay"></div>
      <!--   留言抽屉   -->
      <!--      <yq-drawer></yq-drawer>-->
    </div>
  </transition>
</template>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: transform 0.5s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(100%); /* 进入和离开时设置在可视区域外 */
}

.overlay {
  position: absolute; /* 绝对定位 */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(10px); /* 毛玻璃效果 */
  background-color: rgba(255, 255, 255, 0.2); /* 透明白色 */
  z-index: 1; /* 确保在内容下面 */
}
</style>
