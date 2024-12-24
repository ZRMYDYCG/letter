<script setup lang="ts">
import { useScrollTo } from "~/composables/useScrollTo";

const { scrollTo } = useScrollTo();
</script>

<template>
  <div>
    <header
      class="fixed left-0 right-0 top-0 z-1000 h-15 flex items-center justify-between bg-black bg-opacity-50 px-5 backdrop-blur-md"
    >
      <div class="h-10 w-10 rounded-full bg-transparent" />
      <nav class="ml-5 flex flex-grow justify-between">
        <a
          @click="scrollTo('hero')"
          class="text-lg text-white no-underline transition-opacity hover:opacity-70"
          >首页</a
        >
        <a
          @click="scrollTo('feature1')"
          class="text-lg text-white no-underline transition-opacity hover:opacity-70"
          >留言分享</a
        >
        <a
          @click="scrollTo('feature2')"
          class="text-lg text-white no-underline transition-opacity hover:opacity-70"
          >历史记录</a
        >
        <a
          @click="scrollTo('feature3')"
          class="text-lg text-white no-underline transition-opacity hover:opacity-70"
          >隐私保护</a
        >
      </nav>
    </header>
    <slot />
    <footer class="bg-gray-800 p-5 text-center text-sm text-gray-400">
      <p>© 2024-2025, Letter 留言墙. 保留所有权利。</p>
      <button
        class="theme-toggle cursor-pointer border-none bg-none text-lg text-white transition-colors hover:text-gray-300"
      >
        🌓
      </button>
    </footer>
  </div>
</template>

<style lang="scss"></style>
