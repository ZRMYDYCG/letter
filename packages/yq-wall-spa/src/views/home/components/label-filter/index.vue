<template>
  <div class="flex flex-col w-full sm:flex-row items-center justify-center mt-[40px] gap-[20px] sm:gap-[60px]">
    <ul class="label flex flex-row flex-wrap text-[16px] sm:text-[18px]">
      <li
          class="item px-[10px] sm:px-[15px] py-[6px] my-[2px] text-[#5b5b5b] cursor-pointer whitespace-nowrap transition-all duration-200"
          :class="{
          'text-[#202020] font-semibold border border-[#202020] rounded-[14px]': filterNumber === null
        }"
          @click="handleLabelClick(null)"
      >
        全部
      </li>
      <template v-for="(item, index) in label[commonStore.currentWall]" :key="index">
        <li
            class="item px-[10px] sm:px-[15px] py-[6px] my-[2px] text-[#5b5b5b] cursor-pointer transition-all duration-200"
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
    <div class="flex flex-row text-nowrap gap-[10px] sm:gap-[15px] relative dark:text-[#fff]">
      <div
          class="cursor-pointer text-center"
          :class="{ 'text-[#202020] font-bold dark:text-amber-800': activeTab === 'createdAt' }"
          @click="handleTabClick('createdAt')"
      >按时间</div>
      <div
          class="cursor-pointer text-center"
          :class="{ 'text-[#202020] font-bold dark:text-amber-800': activeTab === 'like' }"
          @click="handleTabClick('like')"
      >按点赞</div>
      <div
          class="cursor-pointer text-center"
          :class="{ 'text-[#202020] font-bold dark:text-amber-800': activeTab === 'comment' }"
          @click="handleTabClick('comment')"
      >按评论</div>
      <div class="active-indicator" :style="indicatorStyle"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { label } from '@/config'
import { useCommonStore } from '@/stores/modules/common.ts'
import { useFilterNumberStore } from '@/stores/modules/filterNumber.ts'
import { storeToRefs } from 'pinia'

const emits = defineEmits(['filter-by-label'])
const commonStore = useCommonStore()
const filterNumberStore = useFilterNumberStore()
const { filterNumber } = storeToRefs(filterNumberStore)

// 用于维护当前的排序状态
const activeTab = ref<'createdAt' | 'like' | 'comment' | null>('createdAt')

// 处理标签点击事件
const handleLabelClick = (labelIdx?: number | null) => {
  const currentSortBy = activeTab.value // 当前排序方式
  filterNumberStore.changeFilterNumber(labelIdx === null ? null : labelIdx)

  // 发出事件，传递当前的标签和排序方式
  emits('filter-by-label', {
    label: labelIdx === null ? null : labelIdx,
    sortBy: currentSortBy
  })
}

// 处理排序选项点击事件
const handleTabClick = (tab: 'createdAt' | 'like' | 'comment') => {
  activeTab.value = tab
  const currentLabel = filterNumber.value // 获取当前标签

  // 发出事件，传递当前的标签和排序方式
  emits('filter-by-label', {
    label: currentLabel,
    sortBy: tab
  })
}

// 计算小横线的位置
const indicatorStyle = computed(() => {
  switch (activeTab.value) {
    case 'createdAt':
      return { left: '5%', width: '20.33%' }
    case 'like':
      return { left: '40.33%', width: '20.33%' }
    case 'comment':
      return { left: '75.66%', width: '20.33%' }
    default:
      return { left: '0%', width: '0%' }
  }
})
</script>

<style scoped>
.active-indicator {
  position: absolute;
  height: 2px;
  background-color: #202020;
  bottom: -5px;
  transition: left 0.3s ease, width 0.3s ease;
}
</style>
