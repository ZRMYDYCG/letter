<template>
  <button
    class="yi-button cursor-pointer font-XiaoKeNaiNao text-center text-nowrap"
    :class="[buttonSizeClass, buttonTypeClass]"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
interface IProps {
  size?: string
  type?: string
}

const props = withDefaults(defineProps<IProps>(), {
  size: 'base',
  type: 'primary'
})

const buttonSizeClass = computed(() => {
  switch (props.size) {
    case 'max':
      return 'min-w-[100px] h-[48px] rounded-[24px] px-[24px] leading-[48px]'
    case 'min':
      return 'min-w-[60px] h-[28px] rounded-[24px] px-[20px] leading-[28px]'
    default: // 'base'
      return 'min-w-[80px] h-[36px] rounded-[24px] px-[20px] leading-[36px]'
  }
})

const buttonTypeClass = computed(() => {
  switch (props.type) {
    case 'primary':
      return 'bg-[#202020] text-white'
    case 'secondary':
      return 'bg-white text-[#202020] border border-[#202020]'
    case 'c-primary':
      return 'bg-[#3b73f0] text-white font-semibold'
    case 'c-secondary':
      return 'bg-white text-[#202020]'
    default:
      return '' // Default case
  }
})
</script>
