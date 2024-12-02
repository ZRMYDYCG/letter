<script setup lang="ts">
import { ref, onMounted, computed, reactive, onBeforeUnmount, nextTick, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useCommonStore } from '@/stores/modules/common.ts'
import { wallType, label } from '@/config/index.ts'
import { getMessages } from '@/api/modules'
import MessageTextCard from './components/message-text-card/index.vue'
import YqDrawer from '@/components/yq-drawer/index.vue'
import CreatMessage from './components/creat-message/index.vue'
import MessageDetail from './components/message-detail/index.vue'
import MessagePhotoCard from './components/message-photo-card/index.vue'
import YqImgView from '@/components/yq-img-view/index.vue'
import YqButton from '@/components/yq-button/index.vue'
import Error from '@/components/Error/index.vue'
import YqFooter from '@/components/Footer/index.vue'
import YqHeader from '@/components/Header/index.vue'

const commonStore = useCommonStore()

const { currentWall } = storeToRefs(commonStore)

const wall = ref<HTMLElement>()
let noteWidth = ref(0)
const isLoading = ref(false)
let cardSelected = ref(-1)
let currentIndex = ref(-1)
let detailData = ref({})
const messageDetailRef = ref<InstanceType<typeof MessageDetail> | null>(null)
let title = ref('')
let isModal = ref(false)
let addBtnBottom = ref('30px')
const isLabelSelected = ref('')
const messageList = ref([])
const photoList = ref([])
const isImgModal = ref(false)
let currentImgIndex = ref(-1)
const totalMessage = ref(0)
const shareImgUrl = ref('')
const isImgUrlLoading = ref(false)

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
    isLabelSelected.value = index
    // 重置结果列表
    messageList.value = []
    // 重置搜索条件, 发起分类搜索
    messageParams.page = 1
    messageParams.pageSize = 10
    messageParams.tag = index
    handleGetMessages()
    toWallTop()
    // 关闭右侧弹窗
    isModal.value = false
    // 关闭激活状态
    cardSelected.value = -1
  }
  if (currentWall.value === 1) {
    // 开启Loading
    isLoading.value = true
    isLabelSelected.value = index
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
 * 动态计算留言墙的宽度
 * */
const getNoteWidth = () => {
  let screenWidth = document.body.clientWidth
  // 300 = 288 + 左右 margin 6px  => 当前屏幕宽度下可以放置卡片的数量 (screenWidth - 120) / 300  ((screenWidth - 120) / 300) * 300 => 卡片墙的总宽度
  noteWidth.value = Math.floor((screenWidth - 120) / 300) * 300
}

/**
 * 触底
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
      messageParams.page * messageParams.pageSize < totalMessage.value &&
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

/**
 * @description: 打开留言弹窗
 * */
const changeModal = () => {
  isModal.value = !isModal.value
  cardSelected.value = -1
  currentIndex.value = -1
  isImgModal.value = false
}

const addCardItem = () => {
  title.value = '写留言'
  isModal.value = !isModal.value
}

/**
 * @description: 点击留言详情
 * */
const clickDetail = (index: number) => {
  title.value = '详情'
  if (cardSelected.value === index) {
    cardSelected.value = -1
    isModal.value = !isModal.value
  } else {
    isModal.value = true
    cardSelected.value = index
    currentIndex.value = index
    detailData.value = messageList.value[currentIndex.value]

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
  isImgModal.value = !isImgModal.value
  isModal.value = !isModal.value
  detailData.value = photoList.value[currentWall]
  currentImgIndex.value = currentWall

  nextTick(() => {
    try {
      messageDetailRef.value?.handleGetMessageComments()
    } catch (error) {
      console.log(error)
    }
  })
}

const clickSwitch = (e: string) => {
  let length = photoList.value.length
  let currentIndex = currentImgIndex.value

  if (e === 'left' && currentIndex > 0) {
    currentIndex--
  } else if (e === 'right' && currentIndex < length - 1) {
    currentIndex++
  } else {
    return
  }
  currentImgIndex.value = currentIndex
  detailData.value = photoList.value[currentIndex]
}

async function handleGetMessages() {
  if (currentWall.value === 0) {
    getMessages(messageParams).then((res: any) => {
      messageList.value.push(...res.data)
      totalMessage.value = res.meta.total
      isLoading.value = false
    })
  }
  if (currentWall.value === 1) {
    getMessages(messageParams).then((res: any) => {
      photoList.value.push(...res.data)
      totalMessage.value = res.meta.total
      isLoading.value = false
    })
  }
}

/**
 * @deprecated 回到顶部
 * */
function toWallTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
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
      messageList.value.unshift(res.data[0])
      toWallTop()
      // 激活该条发送成功的留言
      setTimeout(() => {
        clickDetail(0)
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
 * @description: 处理分享
 * */
const handleShareUrl = (url: string) => {
  shareImgUrl.value = url
}

const closeImgShareDialog = () => {
  shareImgUrl.value = ''
}

const handleFinishLoadingUrl = (val: boolean) => {
  if (val) isImgUrlLoading.value = false
}

const handleDownloadImg = (base64: string) => {
  const link = document.createElement('a')
  link.href = base64
  link.download = new Date().getTime() + '.png'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const handleGetAllMessage = () => {
  isLabelSelected.value = ''
  changeLabelItem('')
}

const isShowImgDialog = computed(() => {
  return shareImgUrl.value !== ''
})

/**
 * @description: 监听墙体变化, 重置状态
 * */
watch(currentWall, async (val) => {
  isModal.value = false
  isImgModal.value = false
  isLabelSelected.value = ''
  currentImgIndex.value = -1
  cardSelected.value = -1
  currentIndex.value = -1
  messageParams.tag = ''
  messageParams.page = 1
  messageParams.pageSize = 10
  messageParams.type = val
  messageList.value = []
  photoList.value = []
  await handleGetMessages()
})

onMounted(async () => {
  if (currentWall.value === 0) {
    isLoading.value = true
    await handleGetMessages()
  }
  window.addEventListener('scroll', () => {
    scrollBottom()
  })
  getNoteWidth()
  // 监听屏幕的变化
  window.addEventListener('resize', () => {
    getNoteWidth()
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', () => {
    scrollBottom()
  })

  window.removeEventListener('resize', () => {
    getNoteWidth()
  })
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
    <ul class="label flex justify-center mt-[40px]">
      <li
        class="item px-[15px] text-[28px] my-[6px] text-[#5b5b5b] cursor-pointer transition-all duration-200"
        @click="handleGetAllMessage"
        :class="{
          'text-[#202020] font-semibold border border-[#202020] rounded-[14px]':
            isLabelSelected === ''
        }"
      >
        全部
      </li>
      <template v-for="(item, index) in label[currentWall]" :key="index">
        <li
          class="item px-[15px] text-[28px] my-[6px] text-[#5b5b5b] cursor-pointer transition-all duration-200"
          :class="{
            'text-[#202020] font-semibold border border-[#202020] rounded-[14px]':
              isLabelSelected === index
          }"
          @click="changeLabelItem(Number(index))"
        >
          {{ item }}
        </li>
      </template>
    </ul>
    <div
      class="card flex flex-wrap pt-[28px] mx-auto"
      :style="{ width: noteWidth + 'px' }"
      v-if="currentWall === 0 && messageList.length > 0"
    >
      <template v-for="(item, index) in messageList" :key="index">
        <message-text-card
          @click.native="clickDetail(index)"
          :class="{ 'border border-[#3b73f0]': index === cardSelected }"
          class="card-item m-[6px] w-[288px]"
          :note="item"
        ></message-text-card>
      </template>
    </div>
    <div v-if="isLoading" class="w-full flex justify-center py-4">
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="20" stroke="gray" stroke-width="5" fill="none" />
        <circle
          cx="25"
          cy="25"
          r="20"
          stroke="rgba(255, 227, 148, 1)"
          stroke-width="5"
          fill="none"
          stroke-dasharray="125.66"
          stroke-dashoffset="0"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="125.66"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
    <div class="photo mt-[30px] grid grid-cols-5 gap-[4px]" v-if="currentWall === 1">
      <template v-for="(item, index) in photoList" :key="index">
        <message-photo-card @click="photoSelect(index)" :photo="item" />
      </template>
    </div>
    <div
      class="flex w-full h-full justify-center items-center"
      v-if="messageList.length <= 0 && !isLoading"
    >
      <Error
        :type="currentWall as string"
        :text="currentWall === 0 ? '快来留言吧~' : '快来留下照片吧~'"
      />
    </div>
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
  <!-- 大图预览 -->
  <yq-img-view
    @click-switch="clickSwitch"
    :img-url="photoList[currentImgIndex]?.image"
    v-show="isImgModal"
  ></yq-img-view>
  <!-- 创建、详情 抽屉 -->
  <yq-drawer @change-modal="changeModal" :title="title" :isModal="isModal">
    <creat-message
      :id="currentWall"
      v-if="title === '写留言'"
      @add-success="handleAddSuccess"
    ></creat-message>
    <message-detail
      ref="messageDetailRef"
      v-if="title === '详情'"
      :item="detailData"
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
  <div
    class="w-screen h-screen fixed top-0 left-0 z-[9999] bg-black bg-opacity-90 flex justify-center items-center"
    v-if="isShowImgDialog"
    @click="closeImgShareDialog"
  >
    <div class="z-[10000] rounded-[12px] overflow-hidden bg-white backdrop-blur-md" @click.stop>
      <img :src="shareImgUrl" alt="#" />
      <div class="flex justify-center w-full gap-4 m-3">
        <yq-button type="secondary" @click="closeImgShareDialog">销毁</yq-button>
        <yq-button @click="handleDownloadImg(shareImgUrl)">下载</yq-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wall-message .label .item.selected {
  color: #202020;
  font-weight: 600;
  border: 1px solid #202020;
  border-radius: 14px;
}

.wall-message .card .cardSelected {
  border: 1px solid #3b73f0;
}
.wall-message .add {
  bottom: v-bind(addBtnBottom);
}
</style>
