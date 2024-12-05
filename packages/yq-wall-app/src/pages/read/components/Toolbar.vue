<script setup lang="ts">
defineProps<{
  bgColor?: string
}>()

const { safeArea } = uni.getSystemInfoSync()
const paddingTop = uni.upx2px(30) + safeArea!.top
</script>

<template>
  <!-- 适配手机状态栏 -->
  <view class="toolbar" :style="{ backgroundColor: bgColor, paddingTop: paddingTop + 'px' }">
    <!--  搜索组件  -->
    <wr-search-view :input="false" show-border placeholder="被讨厌的勇气">
      <template #right>
        <text>书城</text>
      </template>
    </wr-search-view>
  </view>
</template>

<style scoped lang="scss">
.toolbar {
  padding: 30rpx 40rpx;
  border-bottom: 2rpx solid #eee;
}
</style>
