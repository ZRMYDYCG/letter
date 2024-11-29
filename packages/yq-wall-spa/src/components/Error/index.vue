<script setup lang="ts">
interface IProps {
  type: number
}

const props = defineProps<IProps>()
</script>

<template>
  <div class="w-[240px] h-[240px]" v-if="type === 0">
    <img class="w-full h-full object-cover" src="@/assets/images/no-message-text.svg" alt="#">
  </div>
</template>

<style scoped>

</style>