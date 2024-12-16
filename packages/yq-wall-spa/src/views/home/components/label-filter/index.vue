<script setup lang="ts">
import { label } from '@/config'
import { useCommonStore } from '@/stores/modules/common.ts'
import { useFilterNumberStore } from '@/stores/modules/filterNumber.ts'
import { storeToRefs } from 'pinia'

const emits = defineEmits(['filter-by-label'])
const commonStore = useCommonStore()
const filterNumberStore = useFilterNumberStore()
const { filterNumber } = storeToRefs(filterNumberStore)

const handleLabelClick = (label: number | null) => {
  filterNumberStore.changeFilterNumber(label === null ? null : label)
  emits('filter-by-label', label === null ? null : label)
}
</script>

<template>
  <ul class="label flex flex-wrap justify-center mt-[40px] text-[16px] sm:text-[18px]">
    <li
        class="item px-[10px] sm:px-[15px] py-[6px] my-[6px] text-[#5b5b5b] cursor-pointer whitespace-nowrap"
        :class="{
        'text-[#202020] font-semibold border border-[#202020] rounded-[14px]': filterNumber === null
      }"
        @click="handleLabelClick(null)"
    >
      全部
    </li>
    <template v-for="(item, index) in label[commonStore.currentWall]" :key="index">
      <li
          class="item px-[10px] sm:px-[15px] py-[6px] my-[6px] text-[#5b5b5b] cursor-pointer transition-all duration-200 whitespace-nowrap"
          :class="{
          'text-[#202020] font-semibold border border-[#202020] rounded-[14px]':
            filterNumber === index
        }"
          @click="handleLabelClick(index as number)"
      >
        {{ item }}
      </li>
    </template>
  </ul>
</template>

<style scoped></style>
