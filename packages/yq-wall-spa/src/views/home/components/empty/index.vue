<script setup lang="ts">
interface IProps {
  type: number
  text: string
}

const props = defineProps<IProps>()
</script>

<template>
  <!-- 文本消息占位图 -->
  <div class="flex flex-col items-center" v-if="type === 0">
    <img
        class="w-40 h-40 md:w-60 md:h-60 object-cover"
        src="../../../../assets/images/no-message-text.svg"
        alt="#"
    />
    <div class="text-nowrap text-center mt-2 text-sm md:text-base">{{ text }}</div>
  </div>

  <!-- 图片消息占位图 -->
  <div class="flex flex-col items-center" v-if="type === 1">
    <img
        class="w-40 h-40 md:w-60 md:h-60 object-cover"
        src="../../../../assets/images/no-message-img.svg"
        alt="#"
    />
    <div class="text-nowrap text-center mt-2 text-sm md:text-base">{{ text }}</div>
  </div>

  <!-- 通用占位图 -->
  <div class="flex flex-col items-center mt-16 md:mt-16" v-if="type === -1">
    <img
        class="w-20 h-20 md:w-24 md:h-24 object-cover"
        src="../../../../assets/images/no-message-img.svg"
        alt="#"
    />
    <div class="text-nowrap text-center mt-2 text-sm md:text-base">{{ text }}</div>
  </div>
</template>

<style scoped></style>
