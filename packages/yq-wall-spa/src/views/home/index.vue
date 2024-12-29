<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import { useCommonStore } from '@/stores/modules/common'
import useAuthStore from '@/stores/modules/auth'
import YqDrawer from '@/components/yq-drawer/index.vue'
import CreatMessage from './components/creat-message/index.vue'
import MessageDetail from './components/message-detail/index.vue'
import MessagePhotoWall from './components/message-photo-wall/index.vue'
import YqFooter from '@/views/home/components/wall-footer/index.vue'
import YqHeader from '@/views/home/components/wall-header/index.vue'
import MessageTextWall from './components/message-text-wall/index.vue'
import ShareImgMask from './components/share-img-mask/index.vue'
import WallTitle from './components/wall-title/index.vue'
import LabelFilter from './components/label-filter/index.vue'
import darkVideo from '@/assets/images/dark.webm'
import lightVideo from '@/assets/images/light.webm'
import YqLoading from '@/components/yq-loading/index.vue'
import ChatPanel from './components/chat-panel/index.vue'
import MessageVideoWall from './components/message-video-wall/index.vue'
import MessageAnnouncementWall from './components/message-announcement-wall/index.vue'
import MessageIssueWall from './components/message-issue-wall/index.vue'
import UseSetting from './components/use-setting/index.vue'
import { getMessages } from '@/api/modules/message'

import {
  useGetMessages,
  useScrollToTop,
  useAddMessage,
  useResetOnChange,
  useScrollHeight,
  useLabelFilter
} from '@/hook'
import type { IResetOnChange } from '@/hook/useResetOnChange'

const DrawerState = {
  CREATE_MESSAGE: 'CREATE_MESSAGE',
  MESSAGE_DETAIL: 'MESSAGE_DETAIL',
  PROJECT_SETTING: 'PROJECT_SETTING'
}

const commonStore = useCommonStore()
const authStore = useAuthStore()
const { currentWall, themeType, settings } = storeToRefs(commonStore)
const { id } = storeToRefs(authStore)
let isDrawerShow = ref(false) // 右侧抽屉的展示状态
const drawerTitle = ref('每一篇文字，都能抚慰你的心灵')
let currentDrawerState = ref(DrawerState.CREATE_MESSAGE) // 当前抽屉状态
let currentIndex = ref(-1) // 当前激活展示的留言
let messageDetailData = ref({}) // 当前展示的留言详情
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
  await nextTick(async () => {
    // 滚动模式下，判断是否到达底部
    if (commonStore.settings?.otherSettings?.loadingMethod === 'scroll') {
      if (scrollTop.value + clientHeight.value + 260 >= scrollHeight.value) {
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
      }
    }
  })
})
const { changeLabelItem } = useLabelFilter(isLoading, textList, photoList, messageParams, () => {
  toWallTop()
  fetchMessages()
  isDrawerShow.value = false
})

/**
 * @description: 留言抽屉状态切换需要产生的副作用
 * */
const changeDrawer = () => {
  isDrawerShow.value = !isDrawerShow.value
  currentIndex.value = -1
  bigPhotoPreview.value = false
}
/**
 * 修改留言墙标题
 */
const changeWall = () => {
  drawerTitle.value =
    currentWall.value === 0 ? '每一篇文字，都能抚慰你的心灵' : '每一张照片，都能照亮你的美好'
}

/**
 * @description: 打开右侧抽屉
 * */
const openDrawer = (type: any) => {
  currentDrawerState.value = type
  isDrawerShow.value = !isDrawerShow.value
}

/**
 * @description: 支持选择不同类型留言、进行详情预览 TODO: perf: 抽取封装
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
  // 加载留言评论
  messageDetailRef.value?.handleGetMessageComments()
}

/**
 * @description: 点击加载更多
 * */
const clickLoadMore = async () => {
  messageParams.page++
  await fetchMessages()
}

const handleVisitorLogin = async () => {
  textList.value = []
  photoList.value = []
  messageParams.tag = null
  messageParams.page = 1
  messageParams.pageSize = 10
  messageParams.type = currentWall.value
  await fetchMessages()
  toWallTop()
}

/**
 * @description: 页面加载完成后，默认加载第一页数据
 * */
onMounted(async () => {
  if (currentWall.value === 0 || currentWall.value === 1) {
    await fetchMessages()
  }
})
</script>

<template>
  <!-- 头部 -->
  <yq-header @open-setting="openDrawer(DrawerState.PROJECT_SETTING)" @change-wall="changeWall" @visitor-login="handleVisitorLogin" />
  <div class="wall-message pt-14 md:pt-16" v-if="currentWall === 0 || currentWall === 1">
    <!-- 墙标题 -->
    <wall-title></wall-title>
    <!-- 文本留言墙及图片留言墙筛选器 -->
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
    <!-- 加载模式 -->
    <div>
      <!-- Loading messageParams.page > 1 防止第一次渲染页面时打开 Loading -->
      <yq-loading
        v-if="
          isLoading && messageParams.page > 1 && settings?.otherSettings?.loadingMethod === 'scroll'
        "
      ></yq-loading>
      <div
        @click="clickLoadMore"
        v-if="
          settings?.otherSettings?.loadingMethod === 'click' &&
          messageParams.page * messageParams.pageSize <= messageTotal
        "
        class="mt-5"
      >
        <span
          class="dark:text-white dark:border-white w-32 h-10 flex items-center justify-center leading-10 shadow-lg border border-black rounded-lg mx-auto cursor-pointer"
          v-if="!isLoading"
        >
          点击加载更多...
        </span>
        <yq-loading v-if="isLoading && messageParams.page > 1"></yq-loading>
      </div>
      <div
        class="text-center text-gray-400 my-[20px]"
        v-else-if="
          messageTotal !== 0 && messageParams.page * messageParams.pageSize >= messageTotal
        "
      >
        —-—没有更多了—-—
      </div>
    </div>
    <!-- 按钮 -->
    <div
      class="add w-14 h-14 bg-[#202020] shadow-lg rounded-full fixed right-8 bottom-8 flex justify-center items-center text-white transition-all duration-300 cursor-pointer"
      @click="openDrawer(DrawerState.CREATE_MESSAGE)"
      v-show="!isDrawerShow"
    >
      <span>添加</span>
    </div>
  </div>
  <!-- 视频留言墙 -->
  <message-video-wall v-if="currentWall === 2"></message-video-wall>
  <!-- 问题墙 -->
  <message-issue-wall v-if="currentWall === 3"></message-issue-wall>
  <!-- 公告墙 -->
  <message-announcement-wall v-if="currentWall === 4"></message-announcement-wall>
  <!-- 通义小助 -->
  <ChatPanel v-if="currentWall === -1"></ChatPanel>
  <!-- 页脚 -->
  <yq-footer v-if="currentWall === 0 || currentWall === 1"></yq-footer>
  <!-- 创建、详情 抽屉 -->
  <yq-drawer
    @change-modal="changeDrawer"
    :isDrawerShow="isDrawerShow"
    :drawerTitle="drawerTitle"
    v-if="currentWall === 0 || currentWall === 1"
  >
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
    <use-setting v-if="currentDrawerState === DrawerState.PROJECT_SETTING"></use-setting>
  </yq-drawer>
  <!-- 留言墙视频背景 -->
  <video
    :src="themeType === 'light' ? lightVideo : darkVideo"
    class="fixed top-0 left-0 w-full h-full object-cover -z-10"
    autoplay
    muted
    loop
  ></video>
  <!-- 屏幕截屏分享弹窗 -->
  <share-img-mask
    @close-img-download-mask="DownloadImgUrl = ''"
    :DownloadImgUrl="DownloadImgUrl"
    v-if="currentWall === 0 || currentWall === 1"
  ></share-img-mask>
</template>

<style scoped>
.add {
  position: fixed;
  right: 30px;
  transition: all 0.3s;
}
</style>
