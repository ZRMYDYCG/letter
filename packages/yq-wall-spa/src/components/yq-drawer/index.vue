<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useCommonStore } from '@/stores/modules/common.ts'

const commonStore = useCommonStore()
const { currentWall } = storeToRefs(commonStore)

const title = computed(() => {
  return currentWall.value === 0 ? '写留言' : '留照片'
})

interface IProps {
  isDrawerShow: boolean
}

defineProps<IProps>()

const emits = defineEmits(['change-modal'])
const changeModal = () => {
  emits('change-modal')
}
</script>

<template>
  <transition name="modal">
    <div
      class="fixed top-[52px] right-0 w-[360px] h-full bg-white bg-opacity-80 shadow-lg z-[1000] dark:bg-opacity-90 dark:bg-gray-800 dark:text-white"
      v-if="isDrawerShow"
    >
      <div class="flex justify-between items-center p-5 dark:text-white">
        <p class="font-semibold text-[17px] text-[#202020] dark:text-white">{{ title }}</p>
        <span class="text-[#5b5b5b] cursor-pointer dark:text-white" @click="changeModal">
          <iconpark-icon size="20" name="close"></iconpark-icon>
        </span>
      </div>
      <div class="h-full w-full overflow-y-auto pb-[160px]">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.modal-enter-from {
  transform: translateX(360px);
}
.modal-enter-active {
  transition: all 0.3s;
}
.modal-enter-to {
  transform: translateX(0);
}
.modal-leave-from {
  transform: translateX(0);
}
.modal-leave-active {
  transition: all 0.3s;
}
.modal-leave-to {
  transform: translateX(360px);
}
</style>
