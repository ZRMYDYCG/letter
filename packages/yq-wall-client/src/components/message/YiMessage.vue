<script setup lang="ts">
const props = defineProps({
  message: {
    type: String,
    default: ''
  },
  isShow: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: "warn"
  }
})
</script>

<template>
  <transition name="down">
    <div class="yi-message" v-if="isShow">
      <div class="yi-m-i">
        <span>x</span>
        <span class="text">{{ message }}</span>
      </div>
    </div>
  </transition>
</template>

<style scoped lang="scss">

</style>
