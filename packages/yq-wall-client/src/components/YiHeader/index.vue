<script setup lang="ts">
import { computed } from 'vue'
import { useRoute,useRouter } from "vue-router"
import YiButton from '@/components/YiButton/index.vue'

const route = useRoute()
const router = useRouter()
const currentViewId = computed(() => {
  return route.query.id
})

const changeWall = (id: string) => {
  router.push({path: '/wall', query: { id: id }})
}
</script>

<template>
  <div class="YiHeader">
    <div class="logo">
      <img src="@/assets/images/logo.svg" class="logo-img" alt="#">
      <p class="logo-name">一勺同学</p>
    </div>
    <div class="menu">
      <YiButton class="menu-message" @click="changeWall('0')" :type="currentViewId === '0' ? 'c-primary' : 'c-secondary'">留言墙</YiButton>
      <YiButton class="menu-photo" @click="changeWall('1')" :type="currentViewId === '1' ? 'c-primary' : 'c-secondary'">照片墙</YiButton>
    </div>
    <div class="user">
      <div class="user-head"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.YiHeader {
  width: 100%;
  height: 52px;
  background-color: rgba(255, 255, 255, 0.80);
  box-shadow: 0 0 4px 0 rgba(0,0,0, 0.1);
  backdrop-filter: blur(10px); // 背景模糊
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  .logo {
    display: flex;
    align-items: center;
    width: 200px;
    .logo-img {
      width: 40px;
      height: 40px;
    }

    .logo-name {
      font-size: $size-20;
      color: $gray-1;
      font-weight: 600;
      padding-left: $padding-10;
    }
  }

  .menu {
    .menu-message {
      margin-right: 24px;
    }
  }

  .user {
    width: 200px;
    .user-head {
      float: right;
      border-radius: 50%;
      height: 36px;
      width: 36px;
      background-image: linear-gradient(180deg, #7BE7FF 2%, #1E85E2 100%);
    }
  }
}
</style>
