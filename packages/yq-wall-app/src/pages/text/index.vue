<template>
  <view class="text-page">
    <view class="page-header">
      <!--   设置安全距离: 微信小程序端   -->
      <view class="capsule-top" :style="{ height: capsuleButtonPositionData.button_bottom }"></view>
      <view class="header-content">
        <view class="header-content__title">每日精选</view>
        <view class="header-content__more">
          <view class="search-icon">搜索</view>
          <view class="history">历史记录</view>
        </view>
      </view>
    </view>
    <view class="page-content">
      <swiper  class="swiper" :style="{ height: '75vh' }">
        <swiper-item v-for="(item, index) in quotes" :key="index">
          <view class="quote">
            <view class="quote-header" :style="{ background: 'linear-gradient(45deg, #ff9a9e, #fad0c4)' }">
              <view class="quote-header__top">
                <view class="date">{{ item.date.slice(5, 7) }}</view>
                <view class="day">{{ item.day }}</view>
              </view>
              <view class="quote-header__bottom">
                {{  item.date }}
              </view>
            </view>
            <view class="quote-content">
              <text class="content">{{ item.content }}</text>
              <text class="author">{{ item.author }}</text>
            </view>
            <view class="quote-footer"></view>
          </view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { useCapsuleButtonPosition } from '@/hooks';

const capsuleButtonPositionData = useCapsuleButtonPosition();

const quotes = [
  {
    date: '2025年01月',
    day: '星期一',
    content: '后来自知，好朋友不是通过努力争取得来的，而是在各自的道路上奔跑时遇见的。',
    author: '—— 刘同《向着光亮那方》'
  },
  {
    date: '2025年01月',
    day: '星期一',
    content: '生活不是等暴风雨过去，而是学会在风雨中跳舞。',
    author: '—— 维维'
  },
  {
    date: '2025年01月',
    day: '星期一',
    content: '不要为小事而生气，不要为小事而烦恼。',
    author: '—— 佚名'
  },
];
</script>

<style scoped lang="scss">
.text-page {
  width: 100vw;

  .page-header {
    width: 100%;
    .header-content {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10rpx 25rpx;
      .header-content__title {
        font-size: 52rpx;
      }
      .header-content__more {
        display: flex;
        align-items: center;
        .history {
          margin-left: 10rpx;
          border-radius: 10rpx;
          border: 1rpx solid #000;
          padding: 5rpx 10rpx;
          font-size: 30rpx;
          text-align: center;
        }
      }
    }
  }

  .page-content {
    margin-top: 50rpx;

    .quote {
      position: relative;
      height: 100%;
      width: 90%;
      margin: 0 auto;
      border-radius: 10px;
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
      overflow: hidden;

      .quote-header {
        width: 100%;
        height: 45%;
        position: relative;
        color: #fff;

        .quote-header__top {
          position: relative;
          top: 20rpx;
          left: 20rpx;
        }

        .quote-header__bottom {
          position: absolute;
          bottom: 20rpx;
          right: 20rpx;
        }

        .date {
          font-size: 80rpx;
          font-weight: bold;
        }

        .day {
          font-size: 27rpx;
          margin-left: 10rpx;
        }
      }

      .quote-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        height: 55%;
        width: 80%;
      }
    }
  }
}
</style>
