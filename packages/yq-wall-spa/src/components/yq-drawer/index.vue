<script setup lang="ts">
interface IProps {
  isDrawerShow: boolean
  drawerTitle: string
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
      <div class="flex justify-between items-center p-5 border-b border-gray-200 dark:text-white">
        <p class="font-semibold text-[17px] text-[#202020] dark:text-white">{{ drawerTitle }}</p>
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
