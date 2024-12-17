<template>
  <div class="h-[100vh] flex flex-col justify-center items-center overflow-hidden gap-3">
    <!-- 聊天区域 -->
    <!--    <div class="chat-box p-4 overflow-y-auto">-->
    <!--      <div class="messages flex flex-col gap-3">-->
    <!--        <div-->
    <!--          v-for="(message, index) in messages"-->
    <!--          :key="index"-->
    <!--          class="message-wrapper flex"-->
    <!--          :class="message.role === 'user' ? 'justify-end' : 'justify-start'"-->
    <!--        >-->
    <!--          <div-->
    <!--            class="message max-w-[70%] p-2 rounded-xl bg-gray-100 shadow-md"-->
    <!--            :class="message.role === 'user' ? 'bg-blue-500 text-right' : 'bg-gray-100 text-left'"-->
    <!--            v-html="renderMessageContent(message.content)"-->
    <!--          ></div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
    <!--  Logo  -->
    <img src="@/assets/images/kimi.png" alt="logo" class="w-100 h-40" />
    <!-- 输入框 -->
    <div class="input-box flex flex-col justify-center items-center gap-2 w-full max-w-3xl">
      <div
        class="flex flex-col border rounded-lg gap-2 items-center w-[600px] h-[150px] overflow-hidden"
      >
        <textarea
          v-model="userInput"
          placeholder="请输入您的问题..."
          @keyup.enter="sendMessage"
          class="flex-1 w-full p-2 resize-none bg-white text-gray-800 outline-none border-none"
          rows="1"
        ></textarea>

        <!-- 按钮区域 -->
        <div class="flex justify-between items-center w-full p-2">
          <button class="btn">发送</button>
          <button class="btn">选项1</button>
          <button class="btn">选项2</button>
          <button class="btn">选项3</button>
        </div>
      </div>

      <div class="text-center text-gray-500 text-sm mt-2">内容由 AI 大模型生成，请仔细甄别</div>
    </div>
  </div>
  <!--  <router-view></router-view>-->
</template>

<script setup>
import { ref } from 'vue'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css' // 引入代码高亮样式
import chatStartCard from './components/chat-start-card.vue'

// 初始化 Markdown-it，并配置代码高亮
const md = new MarkdownIt({
  highlight: (code, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value
    }
    return '' // 如果未指定语言，则返回原始代码
  }
})

// WebSocket 初始化
const socket = new WebSocket('ws://localhost:5174')
const messages = ref([]) // 聊天记录
const userInput = ref('') // 用户输入内容

let isStreaming = false // 是否正在流式接收数据
let streamingMessage = '' // 当前正在接收的消息

// 渲染消息内容（支持 Markdown 和普通文本）
const renderMessageContent = (content) => {
  return md.render(content)
}

// 监听后端发送的消息
socket.onmessage = (event) => {
  const data = JSON.parse(event.data)

  if (data.isStreaming) {
    isStreaming = true
    streamingMessage = ''
    messages.value.push({ role: 'assistant', content: '' })
  } else if (isStreaming && data.reply) {
    streamingMessage += data.reply
    messages.value[messages.value.length - 1].content = streamingMessage
  } else {
    isStreaming = false
  }
}

// 发送消息给后端
const sendMessage = () => {
  if (!userInput.value.trim()) return

  messages.value.push({ role: 'user', content: userInput.value })

  socket.send(
    JSON.stringify({
      content: userInput.value
    })
  )
  userInput.value = ''
}
</script>
