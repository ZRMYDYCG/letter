<template>
  <div
    ref="chatBoxRef"
    class="chat-box p-4 overflow-y-auto w-full max-w-full md:max-w-[50vw] mx-auto"
  >
    <div class="messages flex flex-col gap-3" style="height: calc(100vh - 250px)">
      <div
        v-for="(message, index) in messages"
        :key="index"
        class="message-wrapper flex items-start gap-2"
        :class="message.role === 'user' ? 'justify-end' : 'justify-start'"
      >
        <img
          v-if="message.role === 'assistant'"
          src="@/assets/images/logo.svg"
          alt="AI头像"
          class="w-8 h-8 rounded-full"
        />

        <div
          class="message p-2 rounded-xl shadow-md max-w-[70%] md:max-w-[90%]"
          :class="message.role === 'user' ? 'bg-blue-500 text-right' : 'bg-gray-100 text-left'"
          v-html="renderMessageContent(message.content)"
        ></div>

        <img
          v-if="message.role === 'user'"
          src="@/assets/images/code.svg"
          alt="用户头像"
          class="w-8 h-8 rounded-full"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import 'highlight.js/styles/github.css'
import { useAiStore } from '@/stores/modules/ai.ts'
import { ref, nextTick, watch, onMounted } from 'vue'

const { messages, renderMessageContent } = useAiStore()
const chatBoxRef = ref(null)

const scrollToBottom = () => {
  if (chatBoxRef.value) {
    const boxHeight = chatBoxRef.value.clientHeight // 聊天框的高度
    const scrollHeight = chatBoxRef.value.scrollHeight // 所有消息的总高度
    chatBoxRef.value.scrollTop = scrollHeight - boxHeight + 140 // 滚动到底部保持140px的间距
  }
}

onMounted(() => {
  scrollToBottom()
})

watch(messages, async () => {
  await nextTick()
  scrollToBottom()
})
</script>

<style scoped></style>
