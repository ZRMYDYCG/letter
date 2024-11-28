<script setup lang="ts" xmlns="">
import { cardColor, label } from '@/config/index.ts'
interface IProps {
  width?: string
  height?: string
  note?: any
}

const props = defineProps<IProps>()
const emits = defineEmits(['item-click'])

const itemClick = () => {
  emits('item-click')
}

const handleLike = () => {
  console.log('like')
}
</script>

<template>
  <div class="yi-card" @click="itemClick" :style="{ width: width, background: cardColor[note.color] }">
    <div class="header">
      <span class="time">{{ note.createdAt }}</span>
      <span class="label">{{ label[0][note.tag] }}</span>
    </div>
    <p class="message">{{ note.content }}</p>
    <div class="footer">
      <div class="footer-left">
        <div class="item">
          <iconpark-icon name="like" size="18" @click.stop="handleLike"></iconpark-icon>
          <span class="value">{{ note.like }}</span>
        </div>
        <div class="item">
          <iconpark-icon name="comment" size="18"></iconpark-icon>
          <span class="value">{{ note.comment }}</span>
        </div>
      </div>
      <div class="name">{{ note.nickName || '匿名' }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
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
.yi-card .header span {
  font-size: 12px;
  color: #949494;
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
.yi-card .footer .footer-left {
  display: flex;
}
.yi-card .footer .footer-left .item {
  display: flex;
  align-items: center;
  padding-right: 8px;
}
.yi-card .footer .footer-left .value {
  font-size: 12px;
  color: #949494;
  padding-left: 4px;
}
.yi-card .footer .name {
  font-family: XiaoKeNaiNao;
  font-size: 16px;
  color: #202020;
  font-weight: 700;
}
</style>
