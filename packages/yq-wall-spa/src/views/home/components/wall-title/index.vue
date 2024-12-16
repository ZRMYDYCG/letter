<script setup lang="ts">
import { useCommonStore } from '@/stores/modules/common.ts'
import { storeToRefs } from 'pinia'
import { wallType } from '@/config'

const commonStore = useCommonStore()
const { currentWall } = storeToRefs(commonStore)
</script>

<template>
  <p
      class="title pt-[48px] pb-[8px] text-[32px] sm:text-[56px] text-[#202020] text-center font-semibold dark:text-white"
  >
    {{ wallType[currentWall].name }}
  </p>
  <p class="individual text-[#5b5b5b] text-center text-sm sm:text-base">
    {{ wallType[currentWall].individual }}
  </p>
</template>

<style scoped></style>
