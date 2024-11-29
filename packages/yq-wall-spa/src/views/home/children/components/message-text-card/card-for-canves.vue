<script setup lang="ts" xmlns="">
import { cardColor, label } from '@/config/index.ts'
interface IProps {
  width?: string
  height?: string
  note?: any
}

const props = defineProps<IProps>()
const emits = defineEmits(['item-click'])
</script>

<template>
  <div class="h-[240px] flex flex-col justify-between" :style="{ width: width, background: cardColor[note.color], fontFamily: 'XiaoKeNaiNao' }">
    <div class="flex justify-between items-center border-b border-gray-300 h-[40px] px-[10px]">
      <img class="w-[30px] h-[30px] border rounded-full" src="@/assets/images/logo.svg" alt="#" />
      <div class="text-gray-500 flex items-center h-full">
        <img src="@/assets/images/tag.svg"  class="w-[12px] h-[12px] mr-[5px]" alt="#" />
        <div class="pb-[15px]">{{ label[0][note.tag] }}</div>
      </div>
    </div>
    <p class="block h-[140px] py-[5px] px-[20px] text-[14px] text-[#202020]">{{ note.content }}</p>
    <div class="flex justify-end border-b border-gray-300 p-[10px]">{{ note.nickName || '匿名' }}</div>
  </div>
</template>

<style scoped>
@font-face {
  font-family: XiaoKeNaiNao;
  src: url("@/assets/fonts/xknn.ttf");
}
</style>
