<script setup lang="ts"></script>

<template>
  <div class="my-4">
    <h3 class="text-sm font-semibold mb-2">导航模式</h3>
    <div class="flex space-x-2 mt-2">
      <div class="flex w-12 h-12 bg-gray-200 shadow-md cursor-pointer border border-orange-300 rounded-md overflow-hidden">
        <div class="w-1/3 bg-gray-800"></div>
      </div>
      <div class="flex flex-col w-12 h-12 bg-gray-200 shadow-md cursor-pointer border border-orange-300 rounded-md overflow-hidden">
        <div class="h-1/3 bg-gray-800"></div>
      </div>
      <div class="w-12 h-12 bg-gray-200 shadow-md flex cursor-pointer border border-orange-300 rounded-md overflow-hidden">
        <div class="w-1/3 bg-gray-800"></div>
        <div class="flex flex-col w-2/3">
          <div class="h-1/3 bg-gray-800"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
