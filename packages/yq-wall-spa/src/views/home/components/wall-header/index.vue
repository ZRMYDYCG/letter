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

const { changeTitle } = useChangeTitle('通义小助')
const currentViewId = computed(() => currentWall.value)

const walls = [
  { id: -1, name: '通义小助' },
  { id: 0, name: '留言墙' },
  { id: 1, name: '照片墙' },
  { id: 2, name: '视频墙' },
  { id: 3, name: '问答墙' },
  { id: 4, name: '公告墙' }
]

const changeWall = (id: number) => {
  commonStore.changeWall(id)
  changeTitle(walls.find((wall) => wall.id === id)?.name || '未知墙体')
  toWallTop()
  filterNumberStore.changeFilterNumber(null)
}

function toWallTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

watch(themeType, () => {
  commonStore.changeThemeType(themeType.value)
})
</script>

<template>
  <header
    class="YiHeader w-full h-[52px] bg-white bg-opacity-80 shadow-md backdrop-blur-md fixed top-0 left-0 z-[9999] flex items-center justify-between px-8 dark:bg-opacity-10"
  >
    <div class="logo w-[200px] flex items-center">
      <img
        src="../../../../assets/images/logo.svg"
        alt="Logo"
        class="logo-img w-[40px] h-[40px] shadow rounded-full transition-transform duration-500 cursor-pointer"
      />
    </div>
    <nav class="menu flex">
      <YiButton
        v-for="(wall, index) in walls"
        :key="index"
        class="menu-message mr-6"
        @click="changeWall(wall.id)"
        :type="currentViewId === wall.id ? 'c-primary' : 'c-secondary'"
      >
        {{ wall.name }}
      </YiButton>
    </nav>
    <div class="user w-[200px] flex items-center justify-end">
      <iconpark-icon
        name="setting"
        class="mr-6 cursor-pointer"
        size="18"
        @click="$emit('open-setting')"
      />
      <YiSwitch class="mr-6" v-model="themeType" active-value="dark" inactive-value="light" />
      <el-dropdown>
        <div
          class="user-head rounded-full h-[36px] w-[36px] bg-gradient-to-b from-[#7be7ff] to-[#1e85e2] float-right"
        ></div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>游客登录</el-dropdown-item>
            <el-dropdown-item>账号登录</el-dropdown-item>
            <el-dropdown-item>注册账号</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
            <el-dropdown-item divided>个人资料</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>
