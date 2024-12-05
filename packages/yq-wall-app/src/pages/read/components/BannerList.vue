<script setup lang="ts"></script>

<template>
  <swiper class="banner-list" next-margin="50rpx" previous-margin="50rpx">
    <swiper-item class="banner-item" v-for="item in 2" :key="item">
      <view class="banner-grid">
        <view class="banner-top">
          <view class="large-img">
            <image src="https://www.biquger.net/files/article/image/3/3360/3360s.jpg"></image>
          </view>
          <view class="img-list">
            <image
              src="https://www.biquger.net/files/article/image/3/3360/3360s.jpg"
              v-for="item in 4"
              :key="item"
            ></image>
          </view>
        </view>
        <view class="banner-bottom">
          <view class="info">
            <view class="title">限时畅读</view>
            <view class="desc">读至付费章节可领7天阅读权益</view>
          </view>
          <text class="button">立即查看</text>
        </view>
      </view>
    </swiper-item>
    <swiper-item class="banner-item" v-for="item in 2" :key="item">
      <view class="banner-images">
        <navigator class="banner-img" v-for="item in 2" :key="item">
          <image></image>
          <view class="info">
            <view class="title">翻一翻</view>
            <view class="desc">翻卡出好礼</view>
          </view>
        </navigator>
      </view>
    </swiper-item>
  </swiper>
</template>

<style scoped lang="scss">
.banner-list {
  margin: 40rpx 0;
  height: 550rpx;

  .banner-item {
    height: 100%;

    .banner-grid {
      height: 100%;
      background-color: white;
      border-radius: 30rpx;
      margin-right: 30rpx;
      overflow: hidden;
      padding: 30rpx;

      .banner-top {
        height: 380rpx;
        display: flex;

        .large-img {
          flex: 1;
          height: 100%;

          image {
            width: 100%;
            height: 100%;
            border: 2rpx solid #eee;
          }
        }

        .img-list {
          flex: 1;
          display: flex;
          flex-wrap: wrap;
          font-size: 0;
          align-content: space-between;
          justify-content: space-between;

          image {
            margin-left: 25rpx;
            border: 2rpx solid #eee;
            width: 115rpx;
            height: 180rpx;
          }
        }
      }

      .banner-bottom {
        height: 110rpx;
        padding-top: 25rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .info {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .title {
            font-size: 32rpx;
          }

          .desc {
            font-size: 20rpx;
            color: #808080;
          }
        }

        .button {
          padding: 8rpx 20rpx;
          background-color: #007aff;
          border-radius: 20rpx;
          font-size: 26rpx;
          color: #fff;
        }
      }
    }

    &:last-child .banner-images {
      margin-right: 0;
    }

    .banner-images {
      height: 100%;
      margin-right: 30rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .banner-img {
        background-color: pink;
        width: 100%;
        height: 260rpx;
        position: relative;
        border-radius: 30rpx;

        image {
          width: 100%;
          height: 100%;
        }

        .info {
          position: absolute;
          left: 30rpx;
          top: 50%;
          transform: translateY(-50%);

          .title {
            font-size: 36rpx;
            color: white;
            font-weight: bold;
          }

          .desc {
            margin-top: 20rpx;
            font-size: 20rpx;
            color: #eee;
          }
        }
      }
    }
  }
}
</style>
