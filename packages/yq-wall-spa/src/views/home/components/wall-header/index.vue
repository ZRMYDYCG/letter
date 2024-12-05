<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useCommonStore } from '@/stores/modules/common.js'
import YiButton from '@/components/yq-button/index.vue'
import { useTheme } from '@/hook'

const commonStore = useCommonStore()
const { currentWall, themeType } = storeToRefs(commonStore)
useTheme()

const currentViewId = computed(() => {
  return currentWall.value
})

const changeWall = (id: number) => {
  commonStore.changeWall(id)
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
        src="../../../../assets/images/logo.svg"
        class="logo-img w-[40px] h-[40px] shadow rounded-full transition-transform duration-500 cursor-pointer"
        alt="#"
      />
    </div>
    <div class="menu">
      <YiButton
        class="menu-message mr-6"
        @click="changeWall(0)"
        :type="currentViewId === 0 ? 'c-primary' : 'c-secondary'"
        >留言墙</YiButton
      >
      <YiButton
        class="menu-photo"
        @click="changeWall(1)"
        :type="currentViewId === 1 ? 'c-primary' : 'c-secondary'"
        >照片墙</YiButton
      >
    </div>
    <div class="user w-[200px] flex items-center justify-end">
      <el-switch
        class="mr-2"
        v-model="themeType"
        active-value="dark"
        inactive-value="light"
        style="
          --el-switch-on-color: #000;
          --el-switch-off-color: #ccc;
          --el-switch-border-color: #ccc;
          --el-switch-background-color: #fff;
          --el-switch-handle-color: #fff;
          --el-switch-border-radius: 10px;
          --el-switch-box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.2);
        "
      ></el-switch>
      <div
        class="user-head rounded-full h-[36px] w-[36px] bg-gradient-to-b from-[#7be7ff] to-[#1e85e2] float-right"
      ></div>
    </div>
  </div>
</template>
