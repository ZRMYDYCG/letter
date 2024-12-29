<template>
  <h1 class="text-center font-bold text-2xl mt-[80px] dark:text-white">项目迭代记录-letter</h1>
  <div class="container mx-auto p-4 mt-[5px] flex flex-col md:flex-row dark:text-white">
    <div class="timeline mt-6 md:w-1/2 md:pr-4">
      <div class="flex flex-col">
        <div
          v-for="(item, index) in blogIterativeRecording"
          :key="index"
          class="relative flex flex-col my-2 pl-4 border-l-2 border-gray-300"
        >
          <div class="absolute left-[-6px] top-0 w-[12px] h-[12px] bg-blue-500 rounded-full"></div>
          <div class="font-bold">{{ item.label }}</div>
          <a class="mt-1 cursor-pointer" target="_blank" :href="item.html_url">{{ item.children }}</a>
        </div>
      </div>
    </div>

    <!-- 内嵌 GitHub Issues 页面 -->
<!--    <iframe-->
<!--      src="https://yq-message-wall.vercel.app/"-->
<!--      class="mt-6 w-full h-[800px] border border-gray-300 md:w-1/2 md:mt-0"-->
<!--      frameborder="0"-->
<!--      allowfullscreen-->
<!--      title="GitHub Issues"-->
<!--    ></iframe>-->
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue'

interface Commit {
  commit: {
    author: { date: string }
    message: string
  }
  html_url: string
}

interface Year {
  value: number
  label: string
}

export default {
  setup() {
    const year = ref<number>(new Date().getFullYear())
    const yearList = ref<Year[]>([])
    const blogIterativeRecording = ref<{ label: string; children: string, html_url?: string }[]>([])

    const getCommitData = async (project: string) => {
      const res = await fetch(
        `https://api.github.com/repos/ZRMYDYCG/${project}/commits?per_page=100`
      )
      const data: Commit[] = await res.json()
      const result = data.map((item) => ({
        label: new Date(item.commit.author.date).toLocaleString(),
        children: item.commit.message,
        html_url: item.html_url,
      }))

      sessionStorage.setItem('blog_project_iterative', JSON.stringify(result))
      if (project === 'letter') {
        blogIterativeRecording.value = result
      }
    }

    const generateYearList = () => {
      const currentYear = new Date().getFullYear()
      yearList.value = Array.from({ length: 10 }, (_, i) => ({
        value: currentYear - i,
        label: (currentYear - i).toString()
      }))
    }

    const loadData = () => {
      const blogProjectIterative = JSON.parse(
        sessionStorage.getItem('blog_project_iterative') || '[]'
      )
      if (blogProjectIterative.length) {
        blogIterativeRecording.value = blogProjectIterative
      } else {
        getCommitData('letter')
      }
    }

    onMounted(() => {
      generateYearList()
      loadData()
    })

    return { year, yearList, blogIterativeRecording }
  }
}
</script>

<style scoped>
iframe {
  max-width: 100%;
}
</style>
