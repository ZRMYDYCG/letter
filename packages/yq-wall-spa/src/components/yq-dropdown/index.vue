<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'

const isOpen = ref<boolean>(false) // Dropdown 开启/关闭状态
const dropdownRef = ref<HTMLElement | null>(null) // 下拉元素的Ref

const toggleDropdown = (): void => {
  isOpen.value = !isOpen.value
}

// 当点击外部时关闭下拉菜单
const closeDropdown = (event: MouseEvent): void => {
  if (dropdownRef.value && !dropdownRef.value?.contains(event.target as Node)) {
    isOpen.value = false
  }
}

watch(isOpen, (newVal) => {
  if (newVal) {
    document.addEventListener('click', closeDropdown)
  } else {
    document.removeEventListener('click', closeDropdown)
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('click', closeDropdown)
})

defineExpose({ toggleDropdown })
</script>

<template>
  <div ref="dropdownRef" class="relative">
    <div class="cursor-pointer" @click="toggleDropdown">
      <slot></slot>
    </div>
    <!-- 下拉内容 -->
    <Transition name="down">
      <div class="absolute right-1/2 transform translate-x-10 translate-y-3" v-if="isOpen">
        <div class="bg-white backdrop-blur-lg shadow-lg z-50 p-2 rounded text-center min-w-[110px]">
          <slot name="menu"></slot>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* 进入起点&离开终点 */
.down-enter-from,
.down-leave-to {
  transform: translateY(-15px);
  opacity: 0;
}
.down-enter-active,
.down-leave-active {
  transition: all 0.3s;
}
/* 进入终点&离开起点 */
.down-enter-to,
.down-leave-from {
  transform: translateY(0);
  opacity: 1;
}
</style>
