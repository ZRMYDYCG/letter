<script setup lang="ts">
import YiHeader from '@/components/YiHeader/index.vue'
import YiFooter from '@/components/YiFooter/index.vue'
</script>

<template>
  <div class="YiFeiHome">
    <yi-header></yi-header>
    <video src="@/assets/images/daytime.mp4" autoplay="true" muted="true" loop="true" class="bg-video"></video>
    <router-view></router-view>
    <yi-footer></yi-footer>
  </div>
</template>

<style scoped>
.YiFeiHome .bg-video {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
}

</style>
