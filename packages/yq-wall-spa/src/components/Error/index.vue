<script setup lang="ts">
interface IProps {
  type: number
  text: string
}

const props = defineProps<IProps>()
</script>

<template>
  <div class="w-[240px] h-[240px] mt-[100px] flex flex-col items-center" v-if="type === 0">
    <img class="w-full h-full object-cover" src="@/assets/images/no-message-text.svg" alt="#">
    <div>{{ text }}</div>
  </div>
</template>

<style scoped>

</style>