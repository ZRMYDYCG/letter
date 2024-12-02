<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import YiButton from '@/components/yq-button/index.vue'

const route = useRoute()
const router = useRouter()
const currentViewId = computed(() => {
  return route.query.id
})

const changeWall = (id: string) => {
  router.push({ path: '/wall', query: { id: id } })
  toWallTop()
}

function toWallTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <div
    class="YiHeader w-full h-[52px] bg-white bg-opacity-80 shadow-md backdrop-blur-md fixed top-0 left-0 z-[9999] flex items-center justify-between px-8"
  >
    <div class="logo flex items-center w-[200px]">
      <img
        src="@/assets/images/logo.svg"
        class="logo-img w-[40px] h-[40px] shadow rounded-full transition-transform duration-500 cursor-pointer"
        alt="#"
        @mouseover="this.style.transform = 'rotate(360deg)'"
        @mouseout="this.style.transform = 'rotate(0deg)'"
      />
    </div>
    <div class="menu">
      <YiButton
        class="menu-message mr-6"
        @click="changeWall('0')"
        :type="currentViewId === '0' ? 'c-primary' : 'c-secondary'"
        >留言墙</YiButton
      >
      <YiButton
        class="menu-photo"
        @click="changeWall('1')"
        :type="currentViewId === '1' ? 'c-primary' : 'c-secondary'"
        >照片墙</YiButton
      >
    </div>
    <div class="user w-[200px]">
      <div
        class="user-head rounded-full h-[36px] w-[36px] bg-gradient-to-b from-[#7be7ff] to-[#1e85e2] float-right"
      ></div>
    </div>
  </div>
</template>
