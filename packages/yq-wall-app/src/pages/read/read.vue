<template>
  <!-- 顶部标题 -->
  <Toolbar :bg-color="toolbarBgColor"></Toolbar>
  <!-- 滚动内容区域 -->
  <scroll-view
    class="read-content"
    :scroll-y="true"
    @scroll="onScroll"
    :refresher-enabled="true"
    refresher-background=""
  >
    <!--  分类列表  -->
    <CateList :list="cateList"></CateList>
    <!--  为你推荐模块  -->
    <wr-book-list
      title="为你推荐"
      bg-color="#fff"
      :list="[]"
      button-str="换一换"
      :orientation="BookListOrientation.VERTICAL"
      @button-click="console.log(123)"
    />
    <!--  banner列表  -->
    <BannerList />
    <!--  榜单模块  -->
    <wr-book-list
      v-for="item in rankList"
      :key="item.id"
      :title="item.name"
      :bg-color="item.id % 2 === 0 ? '' : '#fff'"
      :list="[]"
      :button-str="`查看${item.name}`"
      :orientation="BookListOrientation.HORIZONTAL"
      @button-click="console.log(123)"
    />
  </scroll-view>
</template>

<script setup lang="ts">
import Toolbar from '@/pages/read/components/Toolbar.vue'
import { computed, onMounted, ref } from 'vue'
import CateList from '@/pages/read/components/CateList.vue'
import type { CateItem } from '@/types/category'
import BannerList from '@/pages/read/components/BannerList.vue'
import { BookListOrientation } from '@/types/global'

const scrollTop = ref(0)
const cateList: CateItem[] = [
  {
    id: 1,
    name: '分类',
  },
  {
    id: 2,
    name: '榜单',
  },
  {
    id: 3,
    name: '书单',
  },
  {
    id: 4,
    name: '会员',
  },
  {
    id: 5,
    name: '有声书',
  },
]

/**
 * 临时类型
 */
interface RankItem {
  id: number
  name: string
}

const rankList: RankItem[] = [
  {
    id: 1,
    name: '飙升榜',
  },
  {
    id: 2,
    name: '新书榜',
  },
  {
    id: 3,
    name: '小说榜',
  },
]

const onScroll = (e: UniHelper.ScrollViewOnScrollEvent) => {
  scrollTop.value = e.detail.scrollTop
}

// 当滚动到顶部时，将标题栏背景设置为白色
const toolbarBgColor = computed(() => {
  return scrollTop.value === 0 ? '' : '#fff'
})

onMounted(() => {
  fetch('/api/users', {
    method: 'post',
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res)
    })
})
</script>

<style lang="scss">
/* #ifdef APP-PLUS */
#app,
  /* #endif */
page {
  height: 100%;
  display: flex;
  flex-direction: column;

  .item {
    width: 100rpx;
    height: 100rpx;
    background-color: pink;
  }
}
</style>
