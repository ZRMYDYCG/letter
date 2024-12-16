<script setup lang="ts">
import { useGridTemplate } from '@/hook/useGridTemplate.ts'
import Error from '@/views/home/components/empty/index.vue'
import MessageTextCard from '@/views/home/components/message-text-card/index.vue'

const props = defineProps<{
  messageList: any[]
  isLoading: boolean
  activeTextIndex: number
}>()
const emits = defineEmits(['on-preview'])

const { gridTemplateColumns } = useGridTemplate()
</script>

<template>
  <div
      class="card grid gap-4 pt-[28px] mx-4"
      :style="{ gridTemplateColumns: gridTemplateColumns }"
      v-if="messageList.length > 0"
  >
    <template v-for="(item, index) in messageList" :key="index">
      <message-text-card
          @click="emits('on-preview', index)"
          :class="{ 'border border-[#3b73f0]': index === activeTextIndex }"
          class="card-item w-full"
          :note="item"
      ></message-text-card>
    </template>
  </div>
  <div
      class="flex w-full h-full justify-center items-center"
      v-else-if="messageList.length <= 0 && !isLoading"
  >
    <Error :type="0" text="快来留言吧~" />
  </div>
</template>

<style scoped>
</style>
