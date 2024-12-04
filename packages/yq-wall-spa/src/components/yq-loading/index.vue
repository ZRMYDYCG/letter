<template>
  <div v-if="isLoading" class="w-full flex justify-center py-4">
    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="20" stroke="gray" stroke-width="5" fill="none" />
      <circle
        cx="25"
        cy="25"
        r="20"
        stroke="rgba(255, 227, 148, 1)"
        stroke-width="5"
        fill="none"
        stroke-dasharray="125.66"
        stroke-dashoffset="0"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="0"
          to="125.66"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  isLoading: boolean
}
const props = withDefaults(defineProps<IProps>(), {
  isLoading: false
})
</script>

<style scoped></style>
