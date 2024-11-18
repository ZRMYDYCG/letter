<script setup lang="ts">

</script>

<template>
  <div class="yi-footer">
    <div class="yi-footer-inner">
      <div class="footer-left">
        <div class="logo">
          <img src="@/assets/images/logo.svg" class="logo-img" alt="#" />
          <p class="logo-name">一小池勺</p>
        </div>
        <p class="top-p">池边，一只小巧的勺子静静地躺在那里，仿佛在等待着什么。</p>
        <p class="top-p">它虽小，却承载着满满的情感和故事。每当我拿起这把勺子，轻轻舀起一瓢清水，便能感觉到生活的宁静与美好。</p>
        <p class="state">
          <span>声明</span>
          <span>备案/许可证粤ICP备19012866号</span>
        </p>
      </div>
      <div class="footer-link">
        <p class="title">链接</p>
        <div class="line-inner">
          <a href="">GitHub</a>
          <a href="">我的站点</a>
        </div>
      </div>
      <div class="footer-right">
        <p class="title">打赏</p>
        <div class="right-inner">
          <div>
            <img src="@/assets/images/wx.jpg" alt="">
            <p class="ds-title">微信支付</p>
          </div>
          <div>
            <img src="@/assets/images/zfb.jpg" alt="">
            <p class="ds-title">支付宝支付</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.yi-footer {
  width: 100%;
  height: 200px;
  background-color: $gray-1;
  padding: 20px;
  margin-top: 40px;

  .yi-footer-inner {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;

    p {
      color: rgba(255, 255, 255, 0.5);
    }
  }

  .footer-left {
    .logo {
      display: flex;
      margin-bottom: 24px;
      .logo-img {
        width: 36px;
      }
      .logo-name {
        font-size: 20px;
        color: $gray-10;
        font-weight: 600;
        padding-left: 10px;
      }
    }
    .top-p {
      font-size: $size-12;
      padding-bottom: 4px;
      width: 400px;
    }

    .state {
      font-size: $size-12;
      padding-top: 26px;
      span {
        padding-right: 20px;
      }
    }
  }
  .footer-link {
    .title {
      font-size: $size-20;
      padding-bottom: 12px;
    }
    .link {
      padding-left: 20px;
      flex: 1;
    }
    .line-inner {
      a {
        color: rgba(255, 255, 255, 0.5);
        padding-right: 20px;
      }
    }
  }

  .footer-right {
    .title {
      font-size: $size-20;
      padding-bottom: 12px;
    }
    .right-inner {
      display: flex;
      img {
        width: 160px;
        height: 110px;
        padding-right: 40px;
      }
      .ds-title {
        font-size: $size-12;
        padding-top: 8px;
      }
    }
  }
}
</style>
