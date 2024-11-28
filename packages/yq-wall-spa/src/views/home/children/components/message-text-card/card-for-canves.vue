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
  <div class="yi-card" :style="{ width: width, background: cardColor[note.color] }">
    <div class="flex justify-between items-center p-[10px] border-b border-gray-300">
      <img class="w-[30px] h-[30px] border rounded-full" src="@/assets/images/logo.svg" alt="#">
      <span class="text-gray-500 text-sm">{{ label[0][note.tag] }}</span>
    </div>
    <p class="message">{{ note.content }}</p>
    <div class="footer">
      <div class="name">{{ note.nickName || '匿名' }}</div>
    </div>
  </div>
</template>

<style scoped>
@font-face {
  font-family: XiaoKeNaiNao;
  src: url("@/assets/fonts/xknn.ttf");
}
.yi-card {
  height: 240px;
  padding: 10px 20px 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
}
.yi-card .header {
  display: flex;
  justify-content: space-between;
  padding-bottom: 16px;
}

.yi-card .message {
  height: 140px;
  font-family: XiaoKeNaiNao;
  font-size: 14px;
  color: #202020;
}
.yi-card .footer {
  display: flex;
  justify-content: space-between;
}

.yi-card .footer .name {
  font-family: XiaoKeNaiNao;
  font-size: 16px;
  color: #202020;
  font-weight: 700;
}
</style>
