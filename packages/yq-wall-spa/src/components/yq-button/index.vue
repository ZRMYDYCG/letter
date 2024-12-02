<script setup lang="ts">
const props = defineProps({
  size: {
    type: String,
    default: 'base'
  },
  type: {
    type: String,
    default: 'primary'
  }
})
</script>

<template>
  <button class="yi-button" :class="[size, type]">
    <slot></slot>
  </button>
</template>

<style scoped>
@font-face {
  font-family: XiaoKeNaiNao;
  src: url('@/assets/fonts/xknn.ttf');
}
.yi-button {
  cursor: pointer;
  font-family: XiaoKeNaiNao;
}

.max {
  min-width: 100px;
  height: 48px;
  border-radius: 24px;
  padding: 0 24px;
  line-height: 48px;
}
.base {
  min-width: 80px;
  height: 36px;
  border-radius: 24px;
  padding: 0 20px;
  line-height: 36px;
}
.min {
  min-width: 60px;
  height: 28px;
  border-radius: 24px;
  padding: 0 20px;
  line-height: 28px;
}
.primary {
  background-color: #202020;
  color: #ffffff;
}
.secondary {
  background-color: #ffffff;
  color: #202020;
  border: 1px solid #202020;
}
.c-primary {
  background-color: #3b73f0;
  color: #ffffff;
  font-weight: 600;
}
.c-secondary {
  background-color: #ffffff;
  color: #202020;
}
</style>
