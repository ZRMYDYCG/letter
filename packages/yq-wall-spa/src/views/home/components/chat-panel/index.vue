<template>
  <div class="h-[100vh] flex flex-col justify-center items-center overflow-hidden gap-3">
    <!--  聊天区域  -->
    <router-view></router-view>
    <!--  Logo  -->
    <img v-if="!isChatPage" src="@/assets/images/kimi.png" alt="logo" class="w-80 h-40 sm:mt-10" />
    <!-- 输入框 -->
    <chat-input @send="sendMessage"></chat-input>
    <!--  快捷提问  -->
    <chat-start-card v-if="!isChatPage"></chat-start-card>
    <!--  提示信息  -->
    <div class="text-center text-gray-500 text-sm mt-2">内容由 AI 大模型生成，请仔细甄别</div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import ChatStartCard from './components/chat-start-card.vue'
import ChatInput from './components/chat-input.vue'
import { useAiStore } from '@/stores/modules/ai.ts'

const { sendMessage } = useAiStore()
const route = useRoute()
const isChatPage = ref(false)

watchEffect(() => {
  isChatPage.value = route.path.startsWith('/chat') && Object.keys(route.params).length > 0
})
</script>

<style scoped></style>
