<script setup lang="ts">
import { computed, watch, ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCommonStore } from '@/stores/modules/common.ts'
import { useFilterNumberStore } from '@/stores/modules/filterNumber.ts'
import YiButton from '@/components/yq-button/index.vue'
import YiSwitch from '@/components/yq-switch/index.vue'
import { useTheme, useChangeTitle } from '@/hook'
import { register } from '@/api/modules'

useTheme()

const commonStore = useCommonStore()
const filterNumberStore = useFilterNumberStore()
const { currentWall, themeType } = storeToRefs(commonStore)

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
      const res = await register({ identity: 0 })
      localStorage.setItem('userInfo', JSON.stringify(res.data))
      emits('visitor-login', res.data)
      break
    case 'account':
      console.log('处理账号登录')
      break
    case 'register':
      await router.push('/register')
      console.log('处理注册账号')
      break
    case 'logout':
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
      <iconpark-icon
        name="setting"
        class="mr-4 cursor-pointer"
        size="18"
        @click="$emit('open-setting')"
      />
      <YiSwitch class="mr-4" v-model="themeType" active-value="dark" inactive-value="light" />
      <el-dropdown @command="handleCommand">
        <div
          class="user-head rounded-full h-[36px] w-[36px] bg-gradient-to-b from-[#7be7ff] to-[#1e85e2] float-right"
        ></div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="visitor">游客登录</el-dropdown-item>
            <el-dropdown-item command="account">账号登录</el-dropdown-item>
            <el-dropdown-item command="register">注册账号</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            <el-dropdown-item divided command="profile">个人资料</el-dropdown-item>
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
