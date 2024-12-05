<script setup lang="ts">
import type { CateItem } from '@/types/category'

defineProps<{
  /**
   * 分类数据
   */
  list: CateItem[]
}>()
</script>

<template>
  <view class="cate-list">
    <view class="cate-item" v-for="item in list" :key="item.id">{{ item.name }}</view>
  </view>
</template>

<style scoped lang="scss">
.cate-list {
  display: flex;
  align-items: center;
  padding: 0 40rpx 40rpx;
  overflow-x: scroll;

  .cate-item {
    margin-right: 20rpx;
    padding: 12rpx 25rpx;
    font-size: 26rpx;
    background-color: #e9e9e9;
    border-radius: 30rpx;
    white-space: nowrap;

    &:after {
      font-family: 'wereading', sans-serif;
      content: '\e642';
    }
  }
}
</style>
