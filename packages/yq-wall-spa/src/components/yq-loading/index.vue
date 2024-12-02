<template>
  <teleport :to="container">
    <div
      class="flex flex-col items-center justify-center text-white z-[9999] bg-black bg-opacity-90 fixed top-0 left-0 h-full w-full"
      v-if="isLoading"
    >
      <div class="spinner"></div>
      <p class="mt-1">正在加载...</p>
    </div>
  </teleport>
</template>

<script setup lang="ts">
interface IProps {
  isLoading: boolean
  container: string
}
const props = withDefaults(defineProps<IProps>(), {
  isLoading: false,
  container: 'body'
})
</script>

<style scoped>
.spinner {
  border: 8px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 8px solid white;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
