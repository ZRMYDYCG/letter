<script setup lang="ts">
import { label, cardColor } from '@/utils/data'
import { dataOne } from '@/utils/formatTime'
const props = defineProps({
  width: {
    type: String,
    default: '100%'
  },
  background: {
    type: String,
    default: 'rgba(252, 175, 162, 0.3)'
  },
  note: {
    type: Object,
    default: () => {}
  }
})
const emits = defineEmits(['item-click'])


const itemClick = () => {
  emits('item-click')
}
</script>

<template>
  <div class="yi-card" @click="itemClick" :style="{ width: props.width, background: cardColor[note.imgUrl] }">
    <div class="header">
      <span class="time">{{ dataOne(note.moment) }}</span>
      <span class="label">{{ label[note.type][note.label] }}</span>
    </div>
    <p class="message">{{ note.message }}</p>
    <div class="footer">
      <div class="footer-left">
        <div class="item">
          <span>#</span>
          <span class="value">{{ note.like }}</span>
        </div>
        <div class="item">
          <span>#</span>
          <span class="value">{{ note.comment }}</span>
        </div>
      </div>
      <div class="name">{{ note.name }}</div>
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
