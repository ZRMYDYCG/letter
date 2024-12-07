<script setup lang="ts">
import ChatPanelSetting from './components/chat-panel-setting.vue'
</script>

<template>
  <div class="relative pt-[52px] text-[16px]">
    <!-- 基本设置   -->
    <chat-panel-setting></chat-panel-setting>
    <!-- 聊天发起区域 -->
    <div class="chat-panel-content">
      <div class="chat-panel-input">
        <input type="text" placeholder="请输入内容" />
      </div>
    </div>
    <!-- 快捷聊天项 -->
    <div class="chat-panel-quick-items">
      <div class="chat-panel-quick-item">
        <img src="" alt="" />
        <span>你好</span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
