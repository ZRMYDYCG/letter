<script setup lang="ts">
withDefaults(
  defineProps<{
    /**
     * 是否可输入
     */
    input?: boolean
    /**
     * 是否显示分割线
     * */
    showBorder?: boolean
    /**
     * 占位符
     */
    placeholder?: string
  }>(),
  {
    input: true,
    showBorder: false,
    placeholder: '',
  },
)
</script>

<template>
  <view class="search-view">
    <text class="icon-search"></text>
    <input class="search-input" type="text" :disabled="!input" :placeholder="placeholder" />
    <view class="border" v-if="showBorder"></view>
    <view class="right">
      <slot name="right"></slot>
    </view>
  </view>
</template>

<style scoped lang="scss">
.search-view {
  display: flex;
  align-items: center;
  height: 70rpx;
  padding: 0 30rpx;
  border-radius: 30rpx;
  background-color: #e9e9e9;

  .search-input {
    flex: 1;
    padding: 0 10rpx;
    font-size: 26rpx;
  }

  .border {
    width: 2rpx;
    height: 30rpx;
    margin-right: 30rpx;
    background-color: #dedede;
  }

  .right {
    font-size: 26rpx;
    color: #505050;
    font-weight: bold;
  }
}
</style>
