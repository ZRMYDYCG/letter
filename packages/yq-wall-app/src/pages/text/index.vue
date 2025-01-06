<template>
  <view class="text-page">
    <view class="button-top"></view>
    <view>我处于安全距离~~</view>
  </view>
</template>

<script lang="ts" setup>
import { useCapsuleButtonPosition } from '@/hooks';

const capsuleButtonPositionData = useCapsuleButtonPosition();

console.log('胶囊按钮位置数据:', capsuleButtonPositionData);
</script>

<style lang="scss">
.text-page {
  .button-top {
    height: v-bind(capsuleButtonPositionData.button_top);
  }
}
</style>
