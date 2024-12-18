import { defineStore } from 'pinia'
import { ref } from 'vue'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import { useRouter } from 'vue-router'
import { HOSTIP } from '@/IPV4/ipv4.ts'

export const useAiStore = defineStore('chat', () => {
  const md = new MarkdownIt({
    highlight: (code: any, lang: any) => {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(code, { language: lang }).value
      }
      return ''
    }
  })

  const router = useRouter()

  const messages = ref<any>([])
  const userInput = ref('')
  let isStreaming = false
  let streamingMessage = ''

  // WebSocket 初始化
  const socket = new WebSocket(`ws://${HOSTIP}:5174`)

  // 渲染消息内容
  const renderMessageContent = (content: any) => {
    return md.render(content)
  }

  // 监听后端发送的消息
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data)
    handleIncomingMessage(data)
  }

  const handleIncomingMessage = (data: any) => {
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
  const sendMessage = async () => {
    if (!userInput.value.trim()) return

    messages.value.push({ role: 'user', content: userInput.value })

    socket.send(
      JSON.stringify({
        content: userInput.value
      })
    )
    userInput.value = ''

    await router.push('/chat/assistant')
  }

  return { messages, userInput, renderMessageContent, sendMessage }
})
