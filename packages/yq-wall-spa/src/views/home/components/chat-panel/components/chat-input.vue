<template>
  <div class="flex flex-col items-center gap-2">
    <div
      class="flex flex-col border rounded-lg items-center w-[80vw] md:w-[800px] h-[120px] overflow-hidden"
    >
      <textarea
        v-model="aiStore.userInput"
        placeholder="请输入您的问题..."
        @keyup.enter="sendMessage"
        class="flex-1 w-full p-2 resize-none bg-white text-gray-800 outline-none border-none"
        rows="1"
      ></textarea>

      <!-- 按钮区域 -->
      <div class="flex justify-between bg-white items-center w-full px-4 py-2">
        <div>
          <el-switch v-model="isSearchEnabled"></el-switch>
          <span class="ml-2">联网搜索</span>
        </div>
        <div class="flex gap-2">
          <div class="rounded-lg w-8 h-8 flex justify-center items-center cursor-pointer">
            <iconpark-icon name="tip" size="20"></iconpark-icon>
          </div>
          <div class="rounded-lg w-8 h-8 flex justify-center items-center cursor-pointer">
            <iconpark-icon name="link" size="20"></iconpark-icon>
          </div>
          <div
            class="rounded-lg w-8 h-8 flex justify-center items-center bg-gray-300 text-white cursor-pointer"
          >
            <iconpark-icon name="send" size="20" @click="sendMessage"></iconpark-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAiStore } from '@/stores/modules/ai.ts'
import { defineEmits } from 'vue'

const emit = defineEmits(['send'])
const aiStore = useAiStore()
const isSearchEnabled = ref(false)

const sendMessage = () => {
  if (!aiStore.userInput.trim()) return
  emit('send', aiStore.userInput)
  aiStore.userInput = ''
}
</script>

<style scoped></style>
