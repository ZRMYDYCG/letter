<script setup lang="ts">
interface IProps {
  photo: any
}

const props = defineProps<IProps>()
</script>

<template>
  <div class="photo-card relative transition-all cursor-pointer mb-2">
    <img :src="photo.image" class="photo-img w-full" alt="" />
    <div
      class="photo-cover absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 opacity-0"
    ></div>
    <div
      class="photo-like absolute top-2 left-2 rounded-full h-7 pl-2 pr-3 leading-7 bg-white bg-opacity-80 backdrop-blur-sm transition-opacity duration-300 opacity-0"
    >
      <span class="text-[#949494]">❤️</span>
      <span class="text-[#949494]">{{ photo.like }}</span>
    </div>
  </div>
</template>

<style scoped>
.photo-card:hover .photo-cover {
  opacity: 1;
}

.photo-card:hover .photo-like {
  opacity: 1;
}
</style>
