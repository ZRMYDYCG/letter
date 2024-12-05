<script setup lang="ts">
import type { CardItemProps } from '@/types/global'

defineProps<CardItemProps>()

const emit = defineEmits<{
  (e: 'buttonClick'): void
}>()
</script>

<template>
  <view class="card-item" :style="{ backgroundColor: bgColor }">
    <view class="title">{{ title }}</view>
    <view class="content">
      <slot></slot>
    </view>
    <view class="button" @click="emit('buttonClick')">{{ buttonStr }}</view>
  </view>
</template>

<style scoped lang="scss">
.card-item {
  padding: 40rpx;

  .title {
    font-size: 36rpx;
    font-weight: 500;
  }

  .content {
    padding: 30rpx 0;
  }

  .button {
    background-color: #e9e9e9;
    border-radius: 30rpx;
    height: 70rpx;
    line-height: 70rpx;
    font-size: 26rpx;
    text-align: center;
  }
}
</style>
