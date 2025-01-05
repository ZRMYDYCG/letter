<script setup lang="ts"></script>

<template>
  <div>
    <h3 class="my-4 text-sm font-semibold">整体风格设置</h3>
    <div class="flex space-x-4">
      <!-- 第一个选项 -->
      <div class="relative flex w-12 h-12 bg-gray-200 shadow-md cursor-pointer border border-orange-300 rounded-md overflow-hidden">
        <div class="w-1/3 bg-white"></div>
        <div class="flex flex-col w-2/3">
          <div class="h-1/3 bg-white"></div>
        </div>
      </div>

      <!-- 第二个选项 -->
      <div class="w-12 h-12 bg-gray-200 shadow-md flex cursor-pointer border border-orange-300 rounded-md overflow-hidden">
        <div class="w-1/3 bg-gray-800"></div>
        <div class="flex flex-col w-2/3">
          <div class="h-1/3 bg-white"></div>
        </div>
      </div>

      <!-- 第三个选项 -->
      <div class="w-12 h-12 bg-gray-800 shadow-md cursor-pointer border border-orange-300 rounded-md overflow-hidden"></div>

      <!-- 第四个选项 -->
      <div class="w-12 h-12 bg-white shadow-md cursor-pointer border border-orange-300 rounded-md overflow-hidden"></div>
    </div>
  </div>
</template>

<style scoped></style>
