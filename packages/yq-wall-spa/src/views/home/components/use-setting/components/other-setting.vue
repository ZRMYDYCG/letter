<script setup lang="ts">
import { ref, watch } from 'vue'
import { useCommonStore } from '@/stores/modules/common.ts'

const commonStore = useCommonStore()
const loadingMethod = ref('scroll')

watch(loadingMethod, (newValue) => {
  commonStore.settings.otherSettings.loadingMethod = newValue
})

defineExpose({
  loadingMethod
})
</script>

<template>
  <div class="my-4">
    <h3 class="text-sm font-semibold">其他设置</h3>
    <div class="flex items-center justify-between mt-2">
      <span class="text-sm">弱模式</span>
      <input type="checkbox" class="toggle-checkbox" />
    </div>
    <div class="flex items-center justify-between mt-2">
      <span class="text-sm">是否带边框</span>
      <input type="checkbox" class="toggle-checkbox" />
    </div>
    <div class="flex items-center justify-between mt-2">
      <span class="text-sm">头部固定</span>
      <input type="checkbox" class="toggle-checkbox" />
    </div>
    <div class="flex items-center justify-between mt-2">
      <span class="text-sm">侧边栏固定</span>
      <input type="checkbox" class="toggle-checkbox" />
    </div>
    <div class="flex items-center justify-between mt-2">
      <span class="text-sm">是否需要Footer</span>
      <input type="checkbox" class="toggle-checkbox" />
    </div>
    <div class="flex items-center justify-between mt-2">
      <span class="text-sm">是否开启面包屑</span>
      <input type="checkbox" class="toggle-checkbox" />
    </div>
    <div class="flex flex-col mt-2">
      <span class="text-sm">加载方式</span>
      <select
        class="mt-2 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
        v-model="loadingMethod"
      >
        <option value="click">点击加载</option>
        <option value="scroll">下拉刷新</option>
      </select>
    </div>
  </div>
</template>

<style scoped></style>
