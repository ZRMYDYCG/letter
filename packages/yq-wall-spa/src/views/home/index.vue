<script setup lang="ts">
import { ref, onMounted, computed, reactive, onBeforeUnmount, nextTick, watch } from 'vue'
import { useEventListener } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { useCommonStore } from '@/stores/modules/common.ts'
import { wallType, label } from '@/config/index.ts'
import { getMessages } from '@/api/modules'
import YqDrawer from '@/components/yq-drawer/index.vue'
import CreatMessage from './components/creat-message/index.vue'
import MessageDetail from './components/message-detail/index.vue'
import MessagePhotoWall from './components/message-photo-wall/index.vue'
import YqFooter from '@/components/Footer/index.vue'
import YqHeader from '@/components/Header/index.vue'
import MessageTextWall from './components/message-text-wall/index.vue'
import YqLoading from '@/components/yq-loading/index.vue'

const commonStore = useCommonStore()
const { currentWall } = storeToRefs(commonStore)

const isLoading = ref(false) // 加载状态
let isModal = ref(false) // 右侧抽屉的展示状态
let currentIndex = ref(-1) // 当前激活展示的留言
let messageDetailData = ref({}) // 当前展示的留言详情
let addBtnBottom = ref('30px') // 添加按钮距离底部的距离
const currentLabel = ref(-1) // 当前选择的分类标签
const textList = ref([]) // 文本留言列表
const photoList = ref([]) // 照片留言列表
const bigPhotoPreview = ref(false) // 大图预览状态是否打开
const messageTotal = ref(0) // 总留言数
const shareImgUrl = ref('') // 预览图片的下载链接

let title = ref('')

const isImgUrlLoading = ref(false)

const messageDetailRef = ref<InstanceType<typeof MessageDetail> | null>(null)

const messageParams = reactive({
  userId: JSON.parse(localStorage.getItem('userInfo') || '{}')._id || 0,
  page: 1,
  pageSize: 10,
  tag: '',
  type: currentWall.value
})

const changeLabelItem = (index: any) => {
  /**
   * 0 留言墙
   * 1 照片墙
   * */
  if (currentWall.value === 0) {
    // 开启Loading
    isLoading.value = true
    currentLabel.value = index
    // 重置结果列表
    textList.value = []
    // 重置搜索条件, 发起分类搜索
    messageParams.page = 1
    messageParams.pageSize = 10
    messageParams.tag = index
    handleGetMessages()
    toWallTop()
    // 关闭右侧弹窗
    isModal.value = false
    // 关闭激活状态
    currentIndex.value = -1
  }
  if (currentWall.value === 1) {
    // 开启Loading
    isLoading.value = true
    currentLabel.value = index
    // 重置结果列表
    photoList.value = []
    // 重置搜索条件, 发起分类搜索
    messageParams.page = 1
    messageParams.pageSize = 10
    messageParams.tag = index
    handleGetMessages()
    toWallTop()
    // 关闭右侧弹窗
    isModal.value = false
  }
}

/**
 * @description: 打开留言弹窗
 * */
const changeDrawer = () => {
  isModal.value = !isModal.value
  currentIndex.value = -1
  currentIndex.value = -1
  bigPhotoPreview.value = false
}

const addCardItem = () => {
  title.value = '写留言'
  isModal.value = !isModal.value
}

/**
 * @description: 点击留言详情
 * */
const textSelect = (index: number) => {
  title.value = '详情'
  if (currentIndex.value === index) {
    currentIndex.value = -1
    isModal.value = !isModal.value
  } else {
    isModal.value = true
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
  isModal.value = !isModal.value
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
 * @deprecated 处理新增留言成功
 * */
function handleAddSuccess(val: string) {
  if (val === 'add-success') {
    isModal.value = !isModal.value
    getMessages({
      userId: JSON.parse(localStorage.getItem('userInfo') || '{}')._id || 0,
      page: 1,
      pageSize: 1,
      tag: ''
    }).then((res: any) => {
      textList.value.unshift(res.data[0])
      toWallTop()
      // 激活该条发送成功的留言
      setTimeout(() => {
        textSelect(0)
      }, 300)
    })
  }
  if (val === 'photo') {
    isModal.value = !isModal.value
    getMessages({
      userId: JSON.parse(localStorage.getItem('userInfo') || '{}')._id || 0,
      page: 1,
      pageSize: 1,
      tag: ''
    }).then((res: any) => {
      photoList.value.unshift(res.data[0])
      toWallTop()
    })
  }
}

/**
 * @description: 分享图片截图
 * */
const handleShareUrl = (url: string) => {
  shareImgUrl.value = url
}

/**
 * 等待生成 URL 后关闭 Loading
 * */
const handleFinishLoadingUrl = (val: boolean) => {
  if (val) isImgUrlLoading.value = false
}

const handleGetAllMessage = () => {
  currentLabel.value = -1
  changeLabelItem('')
}

const isShowImgDialog = computed(() => {
  return shareImgUrl.value !== ''
})

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
 * @description: 监听墙体变化, 重置状态
 * */
watch(currentWall, async (val) => {
  isModal.value = false
  bigPhotoPreview.value = false
  currentLabel.value = -1
  currentIndex.value = -1
  messageParams.tag = ''
  messageParams.page = 1
  messageParams.pageSize = 10
  messageParams.type = val
  textList.value = []
  photoList.value = []
  await handleGetMessages()
})

/**
 * @deprecated 回到顶部
 * */
function toWallTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
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
    isLoading.value = true
    await handleGetMessages()
  }
})
</script>

<template>
  <!-- 头部 -->
  <yq-header></yq-header>
  <div class="wall-message min-h-[900px] pt-[52px]">
    <p class="title pt-[48px] pb-[8px] text-[56px] text-[#202020] text-center font-semibold">
      {{ wallType[0].name }}
    </p>
    <p class="individual text-[#5b5b5b] text-center">{{ wallType[0].individual }}</p>
    <!-- 分类标签  -->
    <ul class="label flex justify-center mt-[40px]">
      <li
        class="item px-[15px] text-[28px] my-[6px] text-[#5b5b5b] cursor-pointer transition-all duration-200"
        @click="handleGetAllMessage"
        :class="{
          'text-[#202020] font-semibold border border-[#202020] rounded-[14px]': currentLabel === -1
        }"
      >
        全部
      </li>
      <template v-for="(item, index) in label[currentWall]" :key="index">
        <li
          class="item px-[15px] text-[28px] my-[6px] text-[#5b5b5b] cursor-pointer transition-all duration-200"
          :class="{
            'text-[#202020] font-semibold border border-[#202020] rounded-[14px]':
              currentLabel === index
          }"
          @click="changeLabelItem(Number(index))"
        >
          {{ item }}
        </li>
      </template>
    </ul>
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
      v-show="!isModal"
    >
      <span>添加</span>
    </div>
  </div>
  <!-- 页脚 -->
  <yq-footer></yq-footer>
  <!-- 创建、详情 抽屉 -->
  <yq-drawer @change-modal="changeDrawer" :title="title" :isModal="isModal">
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
      @finish-loading-url="handleFinishLoadingUrl"
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
  <share-img-dialog></share-img-dialog>
</template>

<style scoped>
.wall-message .add {
  bottom: v-bind(addBtnBottom);
}
</style>
