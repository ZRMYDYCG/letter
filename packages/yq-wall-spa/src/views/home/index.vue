<script setup lang="ts">
import YiHeader from '@/components/Header/index.vue'
import YiFooter from '@/components/Footer/index.vue'
</script>

<template>
  <div class="yq-home">
    <yi-header></yi-header>
    <router-view></router-view>
    <yi-footer></yi-footer>
  </div>
  <video src="@/assets/images/daytime.mp4" :autoplay="true" :muted="true" :loop="true" class="fixed top-0 left-0 z-[-1]"></video>
</template>

<style scoped></style>
