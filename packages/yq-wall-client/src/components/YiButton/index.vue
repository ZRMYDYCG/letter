<script setup lang="ts">
const props = defineProps({
  size: {
    type: String,
    default: 'base'
  },
  type: {
    type: String,
    default: 'primary'
  }
})
</script>

<template>
    <button class="yi-button" :class="[size, type]">
      <slot></slot>
    </button>
</template>

<style scoped lang="scss">
.yi-button {
  cursor: pointer;
}
// size
.max {
  min-width: 100px;
  height: 48px;
  border-radius: 24px;
  padding: 0 24px;
  line-height: 48px;
}
.base {
  min-width: 80px;
  height: 36px;
  border-radius: 24px;
  padding: 0 20px;
  line-height: 36px;
}
.min {
  min-width: 72px;
  height: 32px;
  border-radius: 24px;
  padding: 0 20px;
  line-height: 32px;
}
// type
.primary {
  background-color: $gray-1;
  color: $gray-10;
}
.secondary {
  background-color: $gray-10;
  color: $gray-1;
  border: 1px solid $gray-1;
}
.c-primary {
  background-color: $primary-color;
  color: $gray-10;
  font-weight: 600;
}
.c-secondary {
  background-color: $gray-10;
  color: $gray-1;
}
</style>
