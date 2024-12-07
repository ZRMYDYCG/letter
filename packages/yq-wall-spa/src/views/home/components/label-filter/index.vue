<script setup lang="ts">
import { ref } from 'vue'
import { label } from '@/config'
import { useCommonStore } from '@/stores/modules/common.ts'

const emits = defineEmits(['filter-by-label'])
const selectedLabel = ref<number | null>(null)

const commonStore = useCommonStore()

const handleLabelClick = (label: number | null) => {
  selectedLabel.value = label as any
  emits('filter-by-label', label === null ? null : label)
}
</script>

<template>
  <ul class="label flex justify-center mt-[40px] text-[18px]">
    <li
      class="item px-[15px] my-[6px] text-[#5b5b5b] cursor-pointer"
      :class="{
        'text-[#202020] font-semibold border border-[#202020] rounded-[14px]':
          selectedLabel === null
      }"
      @click="handleLabelClick(null)"
    >
      全部
    </li>
    <template v-for="(item, index) in label[commonStore.currentWall]" :key="index">
      <li
        class="item px-[15px] my-[6px] text-[#5b5b5b] cursor-pointer transition-all duration-200"
        :class="{
          'text-[#202020] font-semibold border border-[#202020] rounded-[14px]':
            selectedLabel === index
        }"
        @click="handleLabelClick(index as number)"
      >
        {{ item }}
      </li>
    </template>
  </ul>
</template>

<style scoped></style>
