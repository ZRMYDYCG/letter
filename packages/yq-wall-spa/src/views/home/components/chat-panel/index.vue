<template>
  <div class="chat-container mt-[60px] overflow-hidden">
    <div class="chat-box p-4 overflow-y-auto">
      <div class="messages flex flex-col gap-3">
        <div
          v-for="(message, index) in messages"
          :key="index"
          class="message-wrapper flex"
          :class="message.role === 'user' ? 'justify-end' : 'justify-start'"
        >
          <div
            class="message max-w-[70%] p-2 rounded-xl bg-gray-100 shadow-md"
            :class="message.role === 'user' ? 'bg-blue-500 text-right' : 'bg-gray-100 text-left'"
            v-html="renderMessageContent(message.content)"
          ></div>
        </div>
      </div>
    </div>
    <div class="input-box h-15 flex items-center gap-2 bg-gray-300 border-t border-gray-300 p-2">
      <textarea
        v-model="userInput"
        placeholder="请输入您的问题..."
        @keyup.enter="sendMessage"
        class="flex-1 p-2 border border-gray-300 rounded-lg resize-none bg-white text-gray-800 shadow-inner focus:border-blue-500 focus:shadow-inner-md"
        rows="1"
      ></textarea>
      <button
        @click="sendMessage"
        class="p-2 bg-blue-500 text-white rounded-lg shadow-md transition-colors duration-300 hover:bg-blue-700 active:bg-blue-800"
      >
        发送
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css' // 引入代码高亮样式

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
