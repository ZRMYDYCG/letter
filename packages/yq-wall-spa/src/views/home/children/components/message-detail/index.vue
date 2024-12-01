<script setup lang="ts">
import { ref, defineExpose, h, createApp  } from 'vue'
import { portrait } from '@/config'
import html2canvas from 'html2canvas'
import { getMessageComments, addMessageComment } from '@/api/modules/index.ts'
import MessageTextCard from '@/views/home/children/components/message-text-card/index.vue'
import YqButton from '@/components/yq-button/index.vue'
import RevokeDialog from '../revoke-dialog/index.vue'
import YqLoading from '@/components/yq-loading/index.vue'
import CardForCanves from '../message-text-card/card-for-canves.vue'

const commentList= ref<any[]>([] )
const content = ref('')
const nickName = ref('')
let revokeDialogRef = ref<InstanceType<typeof revokeDialogRef> | null>(null)
const screenshotUrl = ref<string | null>(null)
const imgIsLoaded = ref(false)
const messageTextCardRef = ref<InstanceType<typeof MessageTextCard> | null>(null)

interface IMessageDetail {
  item?: any
}

const props =defineProps<IMessageDetail>()
const emits = defineEmits(['share-url'])

function handleAddMessageComment() {
  addMessageComment({
    messageId: props.item._id,
    content: content.value,
    nickName: nickName.value,
    userId: JSON.parse(localStorage.getItem('userInfo') || '{}')._id,
  }).then((res) => {
    if(res) {
      commentList.value.push(res.data)
      content.value = ''
      nickName.value = ''
      // 获取详情, 更新评论数量
      messageTextCardRef.value?.handleGetMessage()
    }
  })
}

function handleGetMessageComments() {
  getMessageComments({ messageId: props.item._id }).then(res => {
    commentList.value = res.data
  })
}

const handleRevokeDialog = () => {
  revokeDialogRef.value.openDialog(props.item)
}
const handleOnConfirm = (data) => {
  console.log('data', data)
}

/**
 * 分享留言
 * */
const generateScreenshot = async () => {
  imgIsLoaded.value = true

  // 创建隐藏的 DOM 容器
  const hiddenContainer = document.createElement('div')
  document.body.appendChild(hiddenContainer)

  // 获取 CardForCanves 的宽度
  const cardElement = document.querySelector('.card-item') // 获取元素
  if (cardElement) {
    const cardWidth = cardElement.offsetWidth + 70 // 获取宽度
    hiddenContainer.style.width = `${cardWidth}px` // 设置隐藏容器的宽度
  }

  // 创建 Vue 实例
  const appInstance = createApp({
    render() {
      return h(CardForCanves, { note: props.item, width: '100%' }) // 这里使用 100% 以适应容器
    }
  })

  // 挂载组件
  appInstance.mount(hiddenContainer)

  // 等待一段时间以确保 DOM 渲染完毕
  await new Promise(resolve => setTimeout(resolve, 300))

  // 生成截图
  const canvas = await html2canvas(hiddenContainer)
  screenshotUrl.value = canvas.toDataURL("image/png")
  imgIsLoaded.value = false;
  emits('share-url', screenshotUrl.value)

  // 卸载组件并移除隐藏容器
  appInstance.unmount()
  document.body.removeChild(hiddenContainer)
}


defineExpose({
  handleGetMessageComments,
  revokeDialogRef,
  messageTextCardRef
})
</script>

<template>
  <div class="card-detail">
    <div class="top flex justify-between">
      <div>
        <span class="revoke">联系墙主撕掉该便签</span>
        <span class="report" @click="handleRevokeDialog">举报</span>
        <revoke-dialog  ref="revokeDialogRef" title="举报理由" @confirm="handleOnConfirm"></revoke-dialog>
      </div>
      <div v-if="item.type ===0" class="flex gap-1 cursor-pointer" @click="generateScreenshot">
        <span>分享</span>
        <iconpark-icon name="share"></iconpark-icon>
      </div>
    </div>
    <message-text-card ref="messageTextCardRef" class="card-item" :note="item"></message-text-card>
    <div class="form">
      <textarea placeholder="请输入评论" class="message" v-model="content"></textarea>
      <div class="send">
        <input placeholder="签名" class="inp" v-model="nickName" />
        <yq-button @click.native="handleAddMessageComment">确定</yq-button>
      </div>
    </div>
    <p class="title">评论 {{ commentList.length }}</p>
    <ul class="comment" v-if="commentList.length > 0">
      <template v-for="(item, index) in commentList" :key="index">
        <li class="item">
          <div class="user-head" :style="{ backgroundImage: portrait[0] }"></div>
          <div class="detail">
            <div class="detail-top">
              <span class="name">{{ item.nickName || '匿名' }}</span>
              <span class="time">{{ item.createdAt }}</span>
            </div>
            <div class="detail-main">
              {{ item.content }}
            </div>
          </div>
        </li>
      </template>
    </ul>
    <div v-else>
      暂时还没有评论...
    </div>
  </div>
  <yq-loading :is-loading="imgIsLoaded" container="body"></yq-loading>
</template>

<style scoped>
@font-face {
  font-family: XiaoKeNaiNao;
  src: url("@/assets/fonts/xknn.ttf");
}
.card-detail {
  padding: 0 20px;
}
.card-detail .top {
  padding: 10px;
}
.card-detail .top .revoke {
  color: #3B73F0;
  padding-right: 10px;
  cursor: pointer;
}
.card-detail .top .report {
  color: #F67770;
  cursor: pointer;
}
.card-detail .form {
  margin-top: 20px;
}
.card-detail .form .message {
  background: none;
  border: 1px solid #949494;
  resize: none;
  width: 100%;
  padding: 8px;
  font-size: 16px;
  font-family: XiaoKeNaiNao;
}
.card-detail .form .send {
  display: flex;
  margin-top: 10px;
  justify-content: space-between;
}
.card-detail .form .send .inp {
  width: 200px;
  padding: 8px;
  background: none;
  font-family: XiaoKeNaiNao;
  font-weight: 600;
  font-size: 16px;
  border: 1px solid #949494;
}
.card-detail .title {
  margin-top: 20px;
  padding-bottom: 30px;
  color: #202020;
  font-size: 16px;
  font-weight: 600;
  font-family: XiaoKeNaiNao;
}
.card-detail .comment .item {
  display: flex;
  padding-bottom: 30px;
}
.card-detail .comment .item .user-head {
  flex: none;
  width: 28px;
  height: 28px;
  border-radius: 14px;
}
.card-detail .comment .item .detail {
  padding-left: 8px;
}
.card-detail .comment .item .detail .detail-top {
  display: flex;
  align-items: center;
}
.card-detail .comment .item .detail .detail-top .name {
  font-weight: 600;
}
.card-detail .comment .item .detail .detail-top .time {
  font-size: 12px;
  padding-left: 4px;
  color: #949494;
}
.card-detail .comment .item .detail .detail-main {
  padding-top: 4px;
}
</style>
