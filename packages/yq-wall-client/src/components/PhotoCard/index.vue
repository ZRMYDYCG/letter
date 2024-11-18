<script setup lang="ts">
import { label, cardColor } from '@/utils/data'

const props = defineProps({
  photo: {
    type: Object,
    default: () => {}
  }
})
</script>

<template>
  <div class="photo-card">
    <img :src="photo.imgUrl" class="photo-img" alt="">
    <div class="photo-cover"></div>
    <div class="photo-like">
      <span>❤️</span>
      <span>{{ photo.like }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.photo-card {
  position: relative;
  transition: all .3s;
  cursor: pointer;
  margin-bottom: 10px;

  .photo-img {
    width: 100%;
    width: 100%;
  }
  .photo-cover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.2);
    transition: all .3s;
    opacity: 0;
  }
  .photo-like {
    position: absolute;
    left: 8px;
    top: 8px;
    border-radius: 20px;
    height: 28px;
    padding: 0 10px;
    line-height: 28px;
    background-color: rgba(255, 255, 255, 0.80);
    backdrop-filter: blur(10px);
    transition: all .3s;
    opacity: 0;

    span {
      color: $gray-3;
    }
  }
  &:hover {
    .photo-cover {
      opacity: 1;
    }
    .photo-like {
      opacity: 1;
    }
  }
}
</style>
