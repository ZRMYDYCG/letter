<script setup lang="ts">
import { computed, watch, ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCommonStore } from '@/stores/modules/common.ts'
import useAuthStore from '@/stores/modules/auth.ts'
import { useFilterNumberStore } from '@/stores/modules/filterNumber.ts'
import YiSwitch from '@/components/yq-switch/index.vue'
import { useTheme, useChangeTitle } from '@/hook'
import { login } from '@/api/modules'
import { portrait } from '@/config'
import { HOSTIP } from '@/config/ipv4.ts'

useTheme()

const commonStore = useCommonStore()
const authStore = useAuthStore()
const filterNumberStore = useFilterNumberStore()

const { currentWall, themeType } = storeToRefs(commonStore)
const { token, userInfo } = storeToRefs(authStore)

const router = useRouter()
const emits = defineEmits(['visitor-login', 'open-setting', 'change-wall'])

const { changeTitle } = useChangeTitle('通义小助')
const currentViewId = computed(() => currentWall.value)

const walls = [
  { id: -1, name: '通义小助', icon: 'ai' },
  { id: 0, name: '留言墙', icon: 'letter' },
  { id: 1, name: '照片墙', icon: 'photo' },
  { id: 2, name: '视频墙', icon: 'video' },
  { id: 3, name: '问答墙', icon: 'question' },
  { id: 4, name: '公告墙', icon: 'laba' }
]

const changeWall = (id: number) => {
  commonStore.changeWall(id)
  changeTitle(walls.find((wall) => wall.id === id)?.name || '未知墙体')
  toWallTop()
  emits('change-wall', id)
  filterNumberStore.changeFilterNumber(null)
}

const handleCommand = async (command: string) => {
  switch (command) {
    case 'visitor':
      const res = await login({ identity: 3 })
      await authStore.login(res.data)
      // 刷新墙体
      emits('visitor-login')
      break
    case 'account':
      await router.push('/login')
      break
    case 'register':
      await router.push('/register')
      break
    case 'logout':
      localStorage.removeItem('userInfo')
      authStore.logout()
      await router.push('/login')
      break
    case 'profile':
      await router.push('/profile')
      break
    default:
      console.warn('未知命令:', command)
  }
}

function toWallTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

watch(themeType, () => {
  commonStore.changeThemeType(themeType.value)
})

// 控制侧边栏显示与隐藏
const sidebarVisible = ref(false)
const sidebarRef = ref(null)

const toggleSidebar = () => {
  sidebarVisible.value = !sidebarVisible.value
}

const closeSidebar = (event: MouseEvent) => {
  if (sidebarRef.value && !sidebarRef.value.contains(event.composedPath()[0])) {
    toggleSidebar()
  }
}

onMounted(() => {
  document.addEventListener('click', closeSidebar)
})

onUnmounted(() => {
  document.removeEventListener('click', closeSidebar)
})
</script>

<template>
  <header
    class="YiHeader w-full h-[52px] bg-white bg-opacity-20 shadow-md backdrop-blur-md fixed top-0 left-0 z-[9999] flex items-center justify-between px-4 sm:px-8"
  >
    <div @click.stop="toggleSidebar" class="text-sm sm:text-md flex items-center">
      <div class="w-[30px] h-[30px] mr-4 rounded-full overflow-hidden">
        <img class="w-full h-full object-cover" src="@/assets/images/logo.svg" alt="" />
      </div>
      <iconpark-icon name="application-menu" class="cursor-pointer"></iconpark-icon>
    </div>
    <div class="user w-[150px] flex items-center justify-end">
      <iconpark-icon name="github" size="21" class="mr-3 cursor-pointer" @click="window.open('https://github.com/ZRMYDYCG/letter', '_blank')"></iconpark-icon>
      <iconpark-icon name="xiaoxi" size="21" class="mr-3 cursor-pointer"></iconpark-icon>
      <iconpark-icon
        name="setting"
        class="mr-4 cursor-pointer"
        size="18"
        @click="$emit('open-setting')"
      />

      <YiSwitch class="mr-4" v-model="themeType" active-value="dark" inactive-value="light" />
      <div class="text-nowrap mr-2" v-if="userInfo.identity === 3">游客</div>
      <div class="mr-4 text-nowrap" v-else>{{userInfo?.nickname}}</div>
      <el-dropdown @command="handleCommand">

        <div class="rounded-full h-[36px] w-[36px] overflow-hidden shadow-md cursor-pointer outline-none">
          <!-- 默认头像 -->
          <iconpark-icon name="morentouxiang" size="36" v-if="!token"></iconpark-icon>
          <!-- 游客 -->
          <div class="w-full h-full" v-if="token && !(userInfo?.avatar && String(userInfo.avatar).includes('http'))" :style="{ background: portrait[userInfo.avatar] }"></div>
          <!-- 真实用户 -->
          <img v-if="token && userInfo?.avatar && String(userInfo.avatar).includes('http')" class="w-full h-full object-cover" :src="userInfo.avatar.replace('localhost:5174', `${HOSTIP}:5174`)" alt="">
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="visitor" v-if="!token">游客登录</el-dropdown-item>
            <el-dropdown-item command="account" v-if="!token && userInfo?.identity === 3">账号登录</el-dropdown-item>
            <el-dropdown-item command="register">注册账号</el-dropdown-item>
            <el-dropdown-item command="logout" v-if="token">退出登录</el-dropdown-item>
            <el-dropdown-item divided command="profile" v-if="token && !(userInfo.identity === 3)">个人资料</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>

  <transition name="slide">
    <aside
        ref="sidebarRef"
        v-if="sidebarVisible"
        class="sidebar fixed left-0 top-[52px] w-[150px] h-full bg-white bg-opacity-30 shadow-md flex-col flex justify-between overflow-y-auto"
    >
      <el-menu class="menu mt-[15px]" active-text-color=" #ff6d40" text-color="#606266">
        <el-menu-item
            v-for="(wall, index) in walls"
            :key="index"
            :index="String(index)"
            @click="changeWall(wall.id)"
            class="text-center"
            style="background-color: transparent; width: 100%; text-align: center;"
        >
          <div class="w-full flex items-center justify-center">
            <div class="w-[80%] h-[30px] flex justify-center items-center rounded-full px-2 dark:text-white" :class="currentViewId === wall.id ? 'bg-green-200': ''">
              <iconpark-icon :name="wall.icon"></iconpark-icon>
              <span class="flex-1">{{ wall.name }}</span>
            </div>
          </div>
        </el-menu-item>
      </el-menu>
      <img src="https://raw.githubusercontent.com/mayhemantt/mayhemantt/Update/svg/Bottom.svg" class="mb-[45px]" alt="#" />
    </aside>
  </transition>
</template>

<style scoped>
.sidebar {
  transition: transform 0.3s ease;
  z-index: 9998;
}

:deep(.el-menu) {
  --el-menu-bg-color: transparent;
  --el-menu-item-height: 40px;
  border-right: none !important;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
