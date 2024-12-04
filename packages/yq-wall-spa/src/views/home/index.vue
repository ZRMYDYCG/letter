<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useEventListener } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { useCommonStore } from '@/stores/modules/common.ts'
import { getMessages } from '@/api/modules'
import YqDrawer from '@/components/yq-drawer/index.vue'
import CreatMessage from './components/creat-message/index.vue'
import MessageDetail from './components/message-detail/index.vue'
import MessagePhotoWall from './components/message-photo-wall/index.vue'
import YqFooter from '@/views/home/components/wall-footer/index.vue'
import YqHeader from '@/views/home/components/wall-header/index.vue'
import MessageTextWall from './components/message-text-wall/index.vue'
import YqLoading from '@/components/yq-loading/index.vue'
import ShareImgMask from './components/share-img-mask/index.vue'
import WallTitle from './components/wall-title/index.vue'
import LabelFilter from './components/label-filter/index.vue'
import { useGetMessages } from '@/hook/useGetMessages.js'
import { useScrollToTop } from '@/hook/useScrollToTop.ts'
import { useAddMessage } from '@/hook/useAddMessage.ts'
import { useResetOnChange } from '@/hook/useResetOnChange.ts'

const commonStore = useCommonStore()
const { currentWall } = storeToRefs(commonStore)

let isDrawerShow = ref(false) // 右侧抽屉的展示状态
let currentIndex = ref(-1) // 当前激活展示的留言
let messageDetailData = ref({}) // 当前展示的留言详情
let addBtnBottom = ref('30px') // 添加按钮距离底部的距离
const bigPhotoPreview = ref(false) // 大图预览状态是否打开
const DownloadImgUrl = ref('') // 预览图片的下载链接
const messageDetailRef = ref<InstanceType<typeof MessageDetail> | null>(null)
let title = ref('') // TODO: perf

const { isLoading, textList, photoList, messageTotal, fetchMessages, messageParams } =
  useGetMessages(currentWall.value)
const { toWallTop } = useScrollToTop()
const { handleAddSuccess } = useAddMessage(isDrawerShow, textList, photoList)
useResetOnChange(currentWall, async () => {
  isDrawerShow.value = false
  bigPhotoPreview.value = false
  currentIndex.value = -1
  messageParams.tag = ''
  messageParams.page = 1
  messageParams.pageSize = 10
  messageParams.type = currentWall.value
  textList.value = []
  photoList.value = []
  await fetchMessages()
})

const changeLabelItem = (index: any) => {
  // 开启Loading
  isLoading.value = true

  // 基于当前墙体重置结果列表和搜索条件
  const resetListsAndParams = () => {
    if (currentWall.value === 0) {
      textList.value = []
    } else if (currentWall.value === 1) {
      photoList.value = []
    }

    messageParams.page = 1
    messageParams.pageSize = 10
    messageParams.tag = index
  }

  const fetchMessagesAndCloseDrawer = async () => {
    await handleGetMessages()
    toWallTop()
    // 关闭右侧弹窗
    isDrawerShow.value = false
    // 重置激活状态
    currentIndex.value = -1
  }

  resetListsAndParams()
  fetchMessagesAndCloseDrawer()
}

/**
 * @description: 打开留言弹窗
 * */
const changeDrawer = () => {
  isDrawerShow.value = !isDrawerShow.value
  currentIndex.value = -1
  bigPhotoPreview.value = false
}

const addCardItem = () => {
  title.value = '写留言'
  isDrawerShow.value = !isDrawerShow.value
}

/**
 * @description: 点击留言详情
 * */
const textSelect = (index: number) => {
  title.value = '详情'
  if (currentIndex.value === index) {
    currentIndex.value = -1
    isDrawerShow.value = !isDrawerShow.value
  } else {
    isDrawerShow.value = true
    currentIndex.value = index
    messageDetailData.value = textList.value[currentIndex.value]
    nextTick(() => {
      try {
        // 获取留言评论
        messageDetailRef.value?.handleGetMessageComments()
        // 关闭举报弹窗
        messageDetailRef.value?.revokeDialogRef.handleCancel()
      } catch (error) {
        console.log(error)
      }
    })
  }
}

const photoSelect = (currentWall: number) => {
  title.value = '详情'
  bigPhotoPreview.value = !bigPhotoPreview.value
  isDrawerShow.value = !isDrawerShow.value
  messageDetailData.value = photoList.value[currentWall]
  currentIndex.value = currentWall

  nextTick(() => {
    try {
      messageDetailRef.value?.handleGetMessageComments()
    } catch (error) {
      console.log(error)
    }
  })
}

async function handleGetMessages() {
  if (currentWall.value === 0) {
    getMessages(messageParams).then((res: any) => {
      textList.value.push(...res.data)
      messageTotal.value = res.meta.total
      isLoading.value = false
    })
  }
  if (currentWall.value === 1) {
    getMessages(messageParams).then((res: any) => {
      photoList.value.push(...res.data)
      messageTotal.value = res.meta.total
      isLoading.value = false
    })
  }
}

/**
 * @description: 分享图片截图
 * */
const handleShareUrl = (url: string) => {
  DownloadImgUrl.value = url
}

/**
 * @description: 切换大图及对应的留言内容
 * */
const handleSwitchImg = (row: string) => {
  if (row === 'left' && currentIndex.value >= 0) {
    currentIndex.value--
  } else if (row === 'right' && currentIndex.value < photoList.value.length - 1) {
    currentIndex.value++
  }
  messageDetailData.value = photoList.value[currentIndex.value]
}

/**
 * @description: 触底
 * */
const scrollBottom = async () => {
  // 滚动条距离顶部的高度
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  // 屏幕高度
  let clientHeight = document.documentElement.clientHeight
  // 内容高度
  let scrollHeight = document.documentElement.scrollHeight

  // 判断是否到达底部
  if (scrollTop + clientHeight + 260 >= scrollHeight) {
    // 按钮移动
    addBtnBottom.value = scrollTop + clientHeight + 300 - scrollHeight + 'px'

    // 分页加载更多，只在未加载数据时触发
    if (
      (currentWall.value === 0 || currentWall.value === 1) &&
      messageParams.page * messageParams.pageSize < messageTotal.value &&
      isLoading.value === false
    ) {
      isLoading.value = true // 开始加载
      messageParams.page++
      await handleGetMessages()
    }
  } else {
    addBtnBottom.value = '30px'
  }
}

useEventListener(window, 'scroll', scrollBottom)

onMounted(async () => {
  if (currentWall.value === 0) {
    await fetchMessages()
  }
})
</script>

<template>
  <!-- 头部 -->
  <yq-header></yq-header>
  <div class="wall-message min-h-[900px] pt-[52px]">
    <!--  墙标题  -->
    <wall-title></wall-title>
    <!-- 文本留言墙及图片留言墙筛选器  -->
    <label-filter @filter-by-label="changeLabelItem"></label-filter>
    <!-- 文本留言墙 -->
    <message-text-wall
      v-if="currentWall === 0"
      :message-list="textList"
      :is-loading="isLoading"
      @on-preview="textSelect"
      :activeTextIndex="currentIndex"
    ></message-text-wall>
    <!-- 照片留言墙 -->
    <message-photo-wall
      v-if="currentWall === 1"
      :photo-list="photoList"
      @on-preview="photoSelect"
      :activePhotoIndex="currentIndex"
      @switch-img="handleSwitchImg"
    ></message-photo-wall>
    <!-- Loading -->
    <yq-loading :is-loading="isLoading"></yq-loading>
    <!-- 添加按钮 -->
    <div
      class="add w-[56px] h-[56px] bg-[#202020] shadow-lg rounded-[28px] fixed right-[30px] bottom-[30px] flex justify-center items-center text-[#ffffff] transition-all duration-300 cursor-pointer"
      @click="addCardItem"
      v-show="!isDrawerShow"
    >
      <span>添加</span>
    </div>
  </div>
  <!-- 页脚 -->
  <yq-footer></yq-footer>
  <!-- 创建、详情 抽屉 -->
  <yq-drawer @change-modal="changeDrawer" :title="title" :isDrawerShow="isDrawerShow">
    <creat-message
      :id="currentWall"
      v-if="title === '写留言'"
      @add-success="handleAddSuccess"
    ></creat-message>
    <message-detail
      ref="messageDetailRef"
      v-if="title === '详情'"
      :item="messageDetailData"
      @share-url="handleShareUrl"
    ></message-detail>
  </yq-drawer>
  <!-- 留言墙视频背景 -->
  <video
    src="@/assets/images/light.webm"
    autoplay
    muted
    loop
    class="fixed top-0 left-0 z-[-99]"
  ></video>
  <!-- 屏幕截屏分享弹窗 -->
  <share-img-mask
    @close-img-download-mask="DownloadImgUrl = ''"
    :DownloadImgUrl="DownloadImgUrl"
  ></share-img-mask>
</template>

<style scoped>
.wall-message .add {
  bottom: v-bind(addBtnBottom);
}
</style>
