<script setup lang="ts">
interface IProps {
  type: number
  text: string
}

const props = defineProps<IProps>()
</script>

<template>
  <div class="w-[240px] h-[240px] mt-[100px] flex flex-col items-center" v-if="type === 0">
    <img class="w-full h-full object-cover" src="@/assets/images/no-message-text.svg" alt="#" />
    <div class="text-nowrap">{{ text }}</div>
  </div>
  <div class="w-[240px] h-[240px] mt-[100px] flex flex-col items-center" v-if="type === 1">
    <img class="w-full h-full object-cover" src="@/assets/images/no-message-img.svg" alt="#" />
    <div class="text-nowrap">{{ text }}</div>
  </div>
  <div class="w-[80px] h-[80px] mt-[60px] flex flex-col items-center" v-if="type === -1">
    <img class="w-full h-full object-cover" src="@/assets/images/no-message-img.svg" alt="#" />
    <div class="text-nowrap">{{ text }}</div>
  </div>
</template>

<style scoped></style>
