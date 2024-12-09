<script setup lang="ts">
import { Vue3Lottie } from 'vue3-lottie'
import loading from './loading.json'
</script>

<template>
  <div>
    <Vue3Lottie :animationData="loading" :height="100" :width="100" />
  </div>
</template>

<style scoped></style>
