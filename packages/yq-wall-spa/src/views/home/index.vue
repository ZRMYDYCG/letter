<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import { useCommonStore } from '@/stores/modules/common.ts'
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
import darkVideo from '@/assets/images/dark.webm'
import lightVideo from '@/assets/images/light.webm'

import {
  useGetMessages,
  useScrollToTop,
  useAddMessage,
  useResetOnChange,
  useScrollHeight
} from '@/hook'
import type { IResetOnChange } from '@/hook/useResetOnChange.ts'

const DrawerState = {
  CREATE_MESSAGE: 'CREATE_MESSAGE',
  MESSAGE_DETAIL: 'MESSAGE_DETAIL'
}

const commonStore = useCommonStore()
const { currentWall, themeType } = storeToRefs(commonStore)

let isDrawerShow = ref(false) // 右侧抽屉的展示状态
let currentDrawerState = ref(DrawerState.CREATE_MESSAGE) // 当前抽屉状态
let currentIndex = ref(-1) // 当前激活展示的留言
let messageDetailData = ref({}) // 当前展示的留言详情
let addBtnBottom = ref('30px') // 添加按钮距离底部的距离
const bigPhotoPreview = ref(false) // 大图预览状态是否打开
const DownloadImgUrl = ref('') // 预览图片的下载链接
const messageDetailRef = ref<InstanceType<typeof MessageDetail> | null>(null)

const { isLoading, textList, photoList, messageTotal, fetchMessages, messageParams } =
  useGetMessages(currentWall.value)
const { toWallTop } = useScrollToTop()
const { handleAddSuccess } = useAddMessage(isDrawerShow, textList, photoList, () => textSelect(0))
useResetOnChange<IResetOnChange>(currentWall, async () => {
  isDrawerShow.value = false
  bigPhotoPreview.value = false
  currentIndex.value = -1
  messageParams.tag = null
  messageParams.page = 1
  messageParams.pageSize = 10
  messageParams.type = currentWall.value
  textList.value = []
  photoList.value = []
  await fetchMessages()
})
const { scrollTop, clientHeight, scrollHeight } = useScrollHeight(async () => {
  // 判断是否到达底部
  if (scrollTop.value + clientHeight.value + 260 >= scrollHeight.value) {
    // 按钮移动
    addBtnBottom.value = `${scrollTop.value + clientHeight.value + 300 - scrollHeight.value}px`

    // 分页加载更多，只在未加载数据时触发
    if (
      (currentWall.value === 0 || currentWall.value === 1) &&
      messageParams.page * messageParams.pageSize < messageTotal.value &&
      !isLoading.value
    ) {
      isLoading.value = true
      messageParams.page++
      await fetchMessages()
    }
  } else {
    addBtnBottom.value = '30px'
  }
})

/**
 * @description: 标签筛选
 * */
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
    await fetchMessages()
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
 * @description: 留言抽屉状态切换需要产生的副作用
 * */
const changeDrawer = () => {
  isDrawerShow.value = !isDrawerShow.value
  currentIndex.value = -1
  bigPhotoPreview.value = false
}

/**
 * @description: 打开留言抽屉
 * */
const openDrawer = () => {
  currentDrawerState.value = DrawerState.CREATE_MESSAGE
  isDrawerShow.value = !isDrawerShow.value
}

/**
 * @description: 支持选择不同类型留言
 * */
const selectMessage = (index: number, type: 'text' | 'photo' | 'video' | 'audio' | 'link') => {
  currentDrawerState.value = DrawerState.MESSAGE_DETAIL
  if (type === 'text') {
    if (currentIndex.value === index) {
      currentIndex.value = -1
      isDrawerShow.value = !isDrawerShow.value
    } else {
      isDrawerShow.value = true
      currentIndex.value = index
      messageDetailData.value = textList.value[currentIndex.value]
    }
  } else if (type === 'photo') {
    isDrawerShow.value = true
    currentIndex.value = index
    messageDetailData.value = photoList.value[currentIndex.value]
  }

  nextTick(() => {
    try {
      // 加载留言评论
      messageDetailRef.value?.handleGetMessageComments()
      if (type === 'text') {
        // 关闭举报弹窗
        messageDetailRef.value?.revokeDialogRef.handleCancel()
      }
    } catch (error) {
      console.log(error)
    }
  })
}

/**
 * @description: 激活文本留言详情
 * */
const textSelect = (index: number) => {
  selectMessage(index, 'text')
}

/**
 * @description: 激活图片留言详情
 * */
const photoSelect = (index: number) => {
  selectMessage(index, 'photo')
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
 * @description: 页面加载完成后，默认加载第一页数据
 * */
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
      :is-loading="isLoading"
    ></message-photo-wall>
    <!-- Loading -->
    <yq-loading :is-loading="isLoading"></yq-loading>
    <!-- 添加按钮 -->
    <div
      class="add w-[56px] h-[56px] bg-[#202020] shadow-lg rounded-[28px] fixed right-[30px] bottom-[30px] flex justify-center items-center text-[#ffffff] transition-all duration-300 cursor-pointer"
      @click="openDrawer"
      v-show="!isDrawerShow"
    >
      <span>添加</span>
    </div>
  </div>
  <!-- 页脚 -->
  <yq-footer></yq-footer>
  <!-- 创建、详情 抽屉 -->
  <yq-drawer @change-modal="changeDrawer" :isDrawerShow="isDrawerShow">
    <creat-message
      :id="currentWall"
      v-if="currentDrawerState === DrawerState.CREATE_MESSAGE"
      @add-success="handleAddSuccess"
    ></creat-message>
    <message-detail
      ref="messageDetailRef"
      v-if="currentDrawerState === DrawerState.MESSAGE_DETAIL"
      :item="messageDetailData"
      @share-url="handleShareUrl"
    ></message-detail>
  </yq-drawer>
  <!-- 留言墙视频背景 -->
  <video
    :src="themeType === 'light' ? lightVideo : darkVideo"
    class="fixed top-0 left-0 z-[-99] w-full h-full object-cover"
    autoplay
    muted
    loop
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
