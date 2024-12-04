<script setup lang="ts">
import { ref } from 'vue'
import { label } from '@/config'

const emits = defineEmits(['filter-by-label'])
const selectedLabel = ref<number>(-1)

const handleLabelClick = (label: number) => {
  selectedLabel.value = label
  emits('filter-by-label', label === -1 ? -1 : label)
}
</script>

<template>
  <ul class="label flex justify-center mt-[40px] text-[18px]">
    <li
      class="item px-[15px] my-[6px] text-[#5b5b5b] cursor-pointer transition-all duration-200"
      :class="{
        'text-[#202020] font-semibold border border-[#202020] rounded-[14px]': selectedLabel === ''
      }"
      @click="handleLabelClick(-1)"
    >
      全部
    </li>
    <template v-for="(item, index) in label[0]" :key="index">
      <li
        class="item px-[15px] my-[6px] text-[#5b5b5b] cursor-pointer transition-all duration-200"
        :class="{
          'text-[#202020] font-semibold border border-[#202020] rounded-[14px]':
            selectedLabel === item
        }"
        @click="handleLabelClick(index)"
      >
        {{ item }}
      </li>
    </template>
  </ul>
</template>

<style scoped></style>
