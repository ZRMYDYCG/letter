<script setup lang="ts">
import { computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useCommonStore } from '@/stores/modules/common.ts'
import { useFilterNumberStore } from '@/stores/modules/filterNumber.ts'
import YiButton from '@/components/yq-button/index.vue'
import YiSwitch from '@/components/yq-switch/index.vue'
import { useTheme, useChangeTitle } from '@/hook'

useTheme()

const commonStore = useCommonStore()
const filterNumberStore = useFilterNumberStore()
const { currentWall, themeType } = storeToRefs(commonStore)

const { title, changeTitle } = useChangeTitle('通义小助')

const currentViewId = computed(() => {
  return currentWall.value
})

const changeWall = (id: number) => {
  commonStore.changeWall(id)
  changeTitle(
    id === -1
      ? '通义小助'
      : id === 0
        ? '留言墙'
        : id === 1
          ? '照片墙'
          : id === 2
            ? '视频墙'
            : id === 3
              ? '问答墙'
              : id === 4
                ? '公告墙'
                : '未知墙体'
  )
  toWallTop()
  filterNumberStore.changeFilterNumber(null)
}

function toWallTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

watch(
  () => themeType.value,
  () => {
    commonStore.changeThemeType(themeType.value)
  }
)
</script>

<template>
  <div
    class="YiHeader w-full h-[52px] bg-white bg-opacity-80 shadow-md backdrop-blur-md fixed top-0 left-0 z-[9999] flex items-center justify-between px-8 dark:bg-opacity-10"
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
        @click="changeWall(-1)"
        :type="currentViewId === -1 ? 'c-primary' : 'c-secondary'"
        >通义小助
      </YiButton>
      <YiButton
        class="menu-message mr-6"
        @click="changeWall(0)"
        :type="currentViewId === 0 ? 'c-primary' : 'c-secondary'"
        >留言墙
      </YiButton>
      <YiButton
        class="menu-photo mr-6"
        @click="changeWall(1)"
        :type="currentViewId === 1 ? 'c-primary' : 'c-secondary'"
        >照片墙
      </YiButton>
      <YiButton
        class="menu-photo mr-6"
        @click="changeWall(2)"
        :type="currentViewId === 2 ? 'c-primary' : 'c-secondary'"
        >视频墙
      </YiButton>
      <YiButton
        class="menu-photo mr-6"
        @click="changeWall(3)"
        :type="currentViewId === 3 ? 'c-primary' : 'c-secondary'"
        >问答墙
      </YiButton>
      <YiButton
        class="menu-photo"
        @click="changeWall(4)"
        :type="currentViewId === 4 ? 'c-primary' : 'c-secondary'"
        >公告墙
      </YiButton>
    </div>
    <div class="user w-[200px] flex items-center justify-end">
      <iconpark-icon
        name="setting"
        class="mr-6 cursor-pointer"
        size="18"
        @click="$emit('open-setting')"
      ></iconpark-icon>
      <YiSwitch
        class="mr-6"
        v-model="themeType"
        active-value="dark"
        inactive-value="light"
      ></YiSwitch>
      <div
        class="user-head rounded-full h-[36px] w-[36px] bg-gradient-to-b from-[#7be7ff] to-[#1e85e2] float-right"
      ></div>
    </div>
  </div>
</template>
