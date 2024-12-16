<template>
  <div class="chat-start-card bg-transparent shadow-md max-w-[90vw] mx-auto rounded-md md:mt-[10vh] p-5 flex flex-col items-center">
    <div class="greeting-text text-2xl font-bold text-gray-900 dark:text-gray-100 text-center">你好, 我是你的AI智能助手</div>
    <div class="intro-text text-gray-500 dark:text-gray-400 leading-relaxed py-6 text-center">作为你的智能伙伴, 我既能写文案, 想点子, 又能写代码, 做表格</div>
    <div class="question-hint flex justify-between items-center w-full">
      <div class="question-text text-gray-500 dark:text-gray-400">你可以试着问我:</div>
      <div class="change-btn flex items-center">
        <iconpark-icon name="transform" :class="{ 'rotate-animation': isRotating }" class="w-7 mx-2"></iconpark-icon>
        <span @click="rendomData('2')" class="text-indigo-600 cursor-pointer">换一换</span>
      </div>
    </div>
    <div class="default-questions grid grid-cols-1 sm:grid-cols-2 gap-5 pt-6 w-full">
      <div class="default-question-item bg-gray-100 dark:bg-gray-700 p-5 rounded-md" v-for="(item, index) in newData" :key="index">
        <img :src="item.icon" class="w-12" />
        <div class="text-lg font-bold py-2 text-gray-900 dark:text-gray-100">{{ item.title }}</div>
        <span class="text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3">{{ item.description }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"

const problemData = [
  { icon: "", title: "农夫山泉新品上市策略", description: "请分析近期农夫山泉“绿瓶”纯净水上市的原因..." },
  { icon: "", title: "2024电动汽车年中大盘点", description: "帮我整理一下2024年电动汽车行业的大动态..." },
  { icon: "", title: "活动方案策划", description: "设计一份党纪学习教育实践活动的方案策划..." },
  { icon: "", title: "申论备考干货汇总", description: "基于6篇文档，归纳出详细、具体的申论写作技巧..." },
  { icon: "", title: "心得体会", description: "请帮我写《红岩》心得体会，字数不少于800字。" },
  { icon: "", title: "评析申论范文", description: "评阅9篇申论范文的优缺点..." },
  { icon: "", title: "领导发言稿润色", description: "润色这篇讲话稿，要求保留全文主要意思和结构..." },
  { icon: "", title: "云南热门景点", description: "我来云南旅游，请给我一些热门景点或者路线作参考" },
]

// 随机取4项
const newData = ref([]);
const isRotating = ref<boolean>(false)

const rendomData = (type: string) => {
  if (type === '2') {
    if (isRotating.value) return;
    isRotating.value = true;
    setTimeout(() => {
      isRotating.value = false;
    }, 1000);
  }
  newData.value = [...problemData].sort(() => Math.random() - 0.5).slice(0, 4);
}

onMounted(() => {
  rendomData('1');
})
</script>

<style scoped>
.rotate-animation {
  transition: transform 1s;
  transform: rotate(360deg);
}
</style>
