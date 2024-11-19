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

<style scoped>
.yi-footer {
  width: 100%;
  height: 200px;
  background-color: #202020;
  padding: 20px;
  margin-top: 40px;
}
.yi-footer .yi-footer-inner {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.yi-footer .yi-footer-inner p {
  color: rgba(255, 255, 255, 0.5);
}
.yi-footer .footer-left .logo {
  display: flex;
  margin-bottom: 24px;
}
.yi-footer .footer-left .logo .logo-img {
  width: 36px;
}
.yi-footer .footer-left .logo .logo-name {
  font-size: 20px;
  color: #ffffff;
  font-weight: 600;
  padding-left: 10px;
}
.yi-footer .footer-left .top-p {
  font-size: 12px;
  padding-bottom: 4px;
  width: 400px;
}
.yi-footer .footer-left .state {
  font-size: 12px;
  padding-top: 26px;
}
.yi-footer .footer-left .state span {
  padding-right: 20px;
}
.yi-footer .footer-link .title {
  font-size: 20px;
  padding-bottom: 12px;
}
.yi-footer .footer-link .link {
  padding-left: 20px;
  flex: 1;
}
.yi-footer .footer-link .line-inner a {
  color: rgba(255, 255, 255, 0.5);
  padding-right: 20px;
}
.yi-footer .footer-right .title {
  font-size: 20px;
  padding-bottom: 12px;
}
.yi-footer .footer-right .right-inner {
  display: flex;
}
.yi-footer .footer-right .right-inner img {
  width: 160px;
  height: 110px;
  padding-right: 40px;
}
.yi-footer .footer-right .right-inner .ds-title {
  font-size: 12px;
  padding-top: 8px;
}

</style>
