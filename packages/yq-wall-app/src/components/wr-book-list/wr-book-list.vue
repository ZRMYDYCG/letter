<script setup lang="ts">
import { BookListOrientation, type CardItemProps } from '@/types/global'

interface BookListProps extends CardItemProps {
  /**
   * 列表数据
   */
  list: any[]
  /**
   * 列表方向
   */
  orientation?: BookListOrientation
}

withDefaults(defineProps<BookListProps>(), {
  // 默认水平展示
  orientation: BookListOrientation.HORIZONTAL,
})

const emit = defineEmits<{
  (e: 'buttonClick'): void
}>()
</script>

<template>
  <wr-card-item
    :title="title"
    :bg-color="bgColor"
    :button-str="buttonStr"
    @buttonClick="emit('buttonClick')"
  >
    <view class="book-list" :class="[orientation]">
      <navigator class="book-item" v-for="item in 6" :key="item">
        <view class="book-content">
          <image
            class="book-image"
            mode="aspectFill"
            src="https://www.biquger.net/files/article/image/3/3360/3360s.jpg"
          ></image>
          <view class="book-name">我的治愈人生</view>
        </view>
        <text class="book-status" v-if="orientation === BookListOrientation.VERTICAL"
          >总阅读30万
        </text>
      </navigator>
    </view>
  </wr-card-item>
</template>

<style scoped lang="scss">
.book-list {
  display: flex;

  &.horizontal {
    overflow-x: scroll;

    .book-item {
      height: 320rpx;
      margin-right: 40rpx;
    }
  }

  &.vertical {
    flex-wrap: wrap;
    justify-content: space-between;

    .book-item {
      margin-bottom: 40rpx;
    }
  }

  .book-item {
    width: 195rpx;
    height: 280rpx;
    position: relative;
    flex-shrink: 0;

    &:nth-child(n + 3) {
      margin-bottom: 0;
    }

    .book-content {
      height: 100%;
      display: flex;
      flex-direction: column;

      .book-image {
        width: 100%;
        flex: 1;
      }

      .book-name {
        margin-top: 10rpx;
        font-size: 26rpx;
      }
    }

    .book-status {
      position: absolute;
      padding: 10rpx;
      width: 100%;
      box-sizing: border-box;
      left: 0;
      bottom: 0;
      background-color: #3b3b3f;
      color: #fff;
      font-size: 20rpx;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
