<script setup lang="ts">
import { ref, onMounted, computed, reactive, onBeforeUnmount, nextTick, watch } from 'vue'
import { useRoute } from "vue-router"
import { wallType, label } from '@/config'
import { getMessages } from '@/api/modules'
import MessageTextCard from '@/views/home/children/components/message-text-card/index.vue'
import YqModal from '@/components/yq-drawer/index.vue'
import CreatMessage from './components/creat-message/index.vue'
import MessageDetail from './components/message-detail/index.vue'
import MessagePhotoCard from '@/views/home/children/components/message-photo-card/index.vue'
import YqImgView from '@/components/yq-img-view/index.vue'
import YqButton from '@/components/yq-button/index.vue'

const route = useRoute()

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
const isLabelSelected = ref(-1)
const messageList = ref([])
const photoList = ref([
  {
    // 创建时间
    moment: "2024.08.09",
    // 留言 id
    id: 1,
    // 用户 id
    userId: 1,
    // 内容
    message: "日子就是这么的庸常，却有细碎的事物，如太阳碎碎的光芒，洒落其上。",
    // 标签
    label: 0,
    // 用户昵称
    name: "一勺",
    // 点赞数
    like: 12,
    // 评论数
    comment: 4,
    // 背景色
    imgUrl: 'https://pic35.photophoto.cn/20150511/0034034892281415_b.jpg',
    // 是否撤回
    revoke: 0,
    // 是否举报
    report: 0,
    // 类型: 留言 、 照片
    type: 1
  },
  {
    // 创建时间
    moment: "2024.08.09",
    // 留言 id
    id: 2,
    // 用户 id
    userId: 1,
    // 内容
    message: "hello",
    // 标签
    label: 0,
    // 用户昵称
    name: "一勺",
    // 点赞数
    like: 12,
    // 评论数
    comment: 4,
    // 背景色
    imgUrl: 'https://b.zol-img.com.cn/sjbizhi/images/11/1080x1920/1592967802496.jpg',
    // 是否撤回
    revoke: 0,
    // 是否举报
    report: 0,
    // 类型: 留言 、 照片
    type: 1
  },
  {
    // 创建时间
    moment: "2024.08.09",
    // 留言 id
    id: 3,
    // 用户 id
    userId: 1,
    // 内容
    message: "却有细碎的事物，如太阳碎碎的光芒，洒落其上。",
    // 标签
    label: 0,
    // 用户昵称
    name: "一勺",
    // 点赞数
    like: 12,
    // 评论数
    comment: 4,
    // 背景色
    imgUrl: 'https://pic.616pic.com/bg_w1180/00/00/81/zi58oHApHm.jpg!/fw/880',
    // 是否撤回
    revoke: 0,
    // 是否举报
    report: 0,
    // 类型: 留言 、 照片
    type: 1
  },
  {
    // 创建时间
    moment: "2024.08.09",
    // 留言 id
    id: 4,
    // 用户 id
    userId: 1,
    // 内容
    message: "洒落其上。",
    // 标签
    label: 0,
    // 用户昵称
    name: "一勺",
    // 点赞数
    like: 12,
    // 评论数
    comment: 4,
    // 背景色
    imgUrl: 'https://img.zcool.cn/community/01d21e5d467f5da80120695c80a52a.jpg@1280w_1l_2o_100sh.jpg',
    // 是否撤回
    revoke: 0,
    // 是否举报
    report: 0,
    // 类型: 留言 、 照片
    type: 1
  },
  {
    // 创建时间
    moment: "2024.08.09",
    // 留言 id
    id: 5,
    // 用户 id
    userId: 1,
    // 内容
    message: "日子就是这么的庸常",
    // 标签
    label: 0,
    // 用户昵称
    name: "一勺",
    // 点赞数
    like: 12,
    // 评论数
    comment: 4,
    // 背景色
    imgUrl: 'https://pic1.zhimg.com/v2-0cc45f5fda6e8ff79350ec1303835629_r.jpg?source=1940ef5c',
    // 是否撤回
    revoke: 0,
    // 是否举报
    report: 0,
    // 类型: 留言 、 照片
    type: 1
  },
  {
    // 创建时间
    moment: "2024.08.09",
    // 留言 id
    id: 6,
    // 用户 id
    userId: 1,
    // 内容
    message: "日子就是这么的庸常，却有细碎的事物，如太阳碎碎的光芒，洒落其上。",
    // 标签
    label: 0,
    // 用户昵称
    name: "一勺",
    // 点赞数
    like: 12,
    // 评论数
    comment: 4,
    // 背景色
    imgUrl: 'https://pic3.zhimg.com/v2-0d2d9b3a2e1d0ebbdae3b282668c772e_r.jpg',
    // 是否撤回
    revoke: 0,
    // 是否举报
    report: 0,
    // 类型: 留言 、 照片
    type: 1
  },
  {
    // 创建时间
    moment: "2024.08.09",
    // 留言 id
    id: 7,
    // 用户 id
    userId: 1,
    // 内容
    message: "日子就是这么的庸常，却有细碎的事物，如太阳碎碎的光芒，洒落其上。",
    // 标签
    label: 0,
    // 用户昵称
    name: "一勺",
    // 点赞数
    like: 12,
    // 评论数
    comment: 4,
    // 背景色
    imgUrl: 'https://img.keaitupian.cn/newupload/08/1628502171175140.jpg',
    // 是否撤回
    revoke: 0,
    // 是否举报
    report: 0,
    // 类型: 留言 、 照片
    type: 1
  },
  {
    // 创建时间
    moment: "2024.08.09",
    // 留言 id
    id: 8,
    // 用户 id
    userId: 1,
    // 内容
    message: "日子就是这么的庸常，却有细碎的事物，如太阳碎碎的光芒，洒落其上。",
    // 标签
    label: 0,
    // 用户昵称
    name: "一勺",
    // 点赞数
    like: 12,
    // 评论数
    comment: 4,
    // 背景色
    imgUrl: 'https://pic.616pic.com/bg_w1180/00/18/34/C3vNP90km1.jpg!/fw/1120',
    // 是否撤回
    revoke: 0,
    // 是否举报
    report: 0,
    // 类型: 留言 、 照片
    type: 1
  },
  {
    // 创建时间
    moment: "2024.08.09",
    // 留言 id
    id: 9,
    // 用户 id
    userId: 1,
    // 内容
    message: "日子就是这么的庸常，却有细碎的事物，如太阳碎碎的光芒，洒落其上。",
    // 标签
    label: 0,
    // 用户昵称
    name: "一勺",
    // 点赞数
    like: 12,
    // 评论数
    comment: 4,
    // 背景色
    imgUrl: 'https://img95.699pic.com/photo/50059/8720.jpg_wh300.jpg!/fh/300/quality/90',
    // 是否撤回
    revoke: 0,
    // 是否举报
    report: 0,
    // 类型: 留言 、 照片
    type: 1
  }
])
const isImgModal = ref(false)
let currentImgIndex = ref(-1)
const totalMessage = ref(0)
const shareImgUrl = ref('')
const isImgUrlLoading = ref(false)

const messageParams = reactive({
  userId: JSON.parse(localStorage.getItem('userInfo') || '{}')._id || 0,
  page: 1,
  pageSize: 10,
  tag: -1,
})

// 留言墙与照片墙的切换 id
const id = computed(() => {
  return route.query.id
})

const changeLabelItem = (index: number) => {
  isLabelSelected.value = index
  // 重置结果列表
  messageList.value = []
  // 重置搜索条件, 发起分类搜索
  messageParams.page = 1
  messageParams.pageSize = 10
  messageParams.tag = index
  handleGetMessages()
  toWallTop()
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

  if(scrollTop + clientHeight + 230 >= scrollHeight) {
    // 按钮移动
    addBtnBottom.value = (scrollTop + clientHeight + 230 - scrollHeight) + 'px'
    // 分页加载更多
    if(messageParams.page * messageParams.pageSize < totalMessage.value) {
      messageParams.page++
      isLoading.value = true
      await handleGetMessages()
    } else {
        isLoading.value = false
    }
  } else {
    addBtnBottom.value = '30px'
  }
}

/**
 * 打开留言弹窗
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
  if(cardSelected.value === index) {
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

const photoSelect = (id: number) => {
  title.value = '详情'
  isImgModal.value = !isImgModal.value
  isModal.value = !isModal.value
  detailData.value = photoList.value[id]
  currentImgIndex.value = id
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
  getMessages(messageParams).then((res: any) => {
    messageList.value.push(...res.data)
    totalMessage.value = res.meta.total
  })
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
function handleAddSuccess(val: boolean) {
  if(!val) return
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

/*
* @description: 处理分享
* **/
const handleShareUrl = (url: string) => {
  shareImgUrl.value = url
}

const isShowImgDialog = computed(() => {
  return shareImgUrl.value !== ''
})

const closeImgShareDialog = () => {
  shareImgUrl.value = ''
}

const handleFinishLoadingUrl = (val: boolean) => {
  if(val) isImgUrlLoading.value = false
}

const handleDownloadImg = (base64: string) => {
  const link = document.createElement('a')
  link.href = base64
  link.download = new Date().getTime() + '.png'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

onMounted(() => {
  handleGetMessages()
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
  <div class="wall-message">
    <p class="title">{{ wallType[id].name }}</p>
    <p class="individual">{{ wallType[id].individual }}</p>
    <ul class="label">
      <li class="item" @click="isLabelSelected = -1" :class="{ selected: isLabelSelected === -1 }">全部</li>
      <template v-for="(item, index) in label[id]" :key="index">
        <li class="item" :class="{ selected: isLabelSelected === index }" @click="changeLabelItem(Number(index))">{{ item }}</li>
      </template>
    </ul>
    <div class="card" :style="{ width: noteWidth + 'px' }" v-if="id === '0' && messageList.length > 0">
      <template v-for="(item, index) in messageList" :key="index">
        <message-text-card @click.native="clickDetail(index)" :class="{ cardSelected: index === cardSelected }" class="card-item" :note="item" width="288px"></message-text-card>
      </template>
      <div v-if="isLoading" class="w-full flex justify-center py-4">正在加载...</div>
    </div>
    <div v-else>
      暂时还没有留言...
    </div>
    <div class="photo" v-if="id === '1'">
      <template v-for="(item, index) in photoList" :key="index">
        <message-photo-card @click="photoSelect(index)" :photo="item"></message-photo-card>
      </template>
    </div>
    <div class="add" @click="addCardItem" v-show="!isModal">
      <span>添加</span>
    </div>
    <yq-modal @change-modal="changeModal" :title="title" :isModal="isModal">
      <creat-message :id="Number(id)" v-if="title === '写留言'" @add-success="handleAddSuccess"></creat-message>
      <message-detail ref="messageDetailRef" v-if="title === '详情'" :item="detailData" @share-url="handleShareUrl" @finish-loading-url="handleFinishLoadingUrl"></message-detail>
    </yq-modal>
    <yq-img-view @click-switch="clickSwitch" :img-url="photoList[currentImgIndex]?.imgUrl" v-show="isImgModal"></yq-img-view>
  </div>
  <transition name="fade">
    <div class="w-screen h-screen fixed top-0 left-0 z-[9999] bg-black bg-opacity-90 flex justify-center items-center"
         v-if="isShowImgDialog"
         @click="closeImgShareDialog"
        >
      <div class="z-[10000] rounded-[12px] overflow-hidden bg-white backdrop-blur-md" @click.stop>
        <img :src="shareImgUrl" alt="#">
        <div class="flex justify-center w-full gap-4 m-3">
          <yq-button type="secondary" @click="closeImgShareDialog">销毁</yq-button>
          <yq-button @click="handleDownloadImg(shareImgUrl)">下载</yq-button>
        </div>
      </div>
    </div>
  </transition>
</template>


<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter, .fade-leave-to { /* .fade-leave-active in < 2.1.8 */
  opacity: 0;
}

.wall-message {
  min-height: 800px;
  padding-top: 52px;
}
.wall-message .title {
  padding-top: 48px;
  padding-bottom: 8px;
  font-size: 56px;
  color: #202020;
  text-align: center;
  font-weight: 600;
}
.wall-message .individual {
  color: #5B5B5B;
  text-align: center;
}
.wall-message .label {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}
.wall-message .label .item {
  padding: 0 15px;
  line-height: 28px;
  margin: 6px;
  color: #5B5B5B;
  cursor: pointer;
  transition: all 0.2s;
}
.wall-message .label .item.selected {
  color: #202020;
  font-weight: 600;
  border: 1px solid #202020;
  border-radius: 14px;
}
.wall-message .card {
  display: flex;
  flex-wrap: wrap;
  padding-top: 28px;
  margin: auto;
}
.wall-message .card .card-item {
  margin: 6px;
}
.wall-message .card .cardSelected {
  border: 1px solid #3B73F0;
}
.wall-message .add {
  width: 56px;
  height: 56px;
  background-color: #202020;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.08);
  border-radius: 28px;
  position: fixed;
  right: 30px;
  bottom: v-bind(addBtnBottom);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  transition: all 0.3s;
}
.wall-message .photo {
  column-count: 5;
  column-gap: 4px;
  counter-reset: count;
  width: 88%;
  margin: 0 auto;
}
</style>
