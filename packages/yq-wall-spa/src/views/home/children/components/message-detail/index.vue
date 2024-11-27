<script setup lang="ts">
import { onMounted, ref, defineExpose } from 'vue'
import { portrait } from '@/config'
import { getMessageComments, addMessageComment } from '@/api/modules/index.ts'
import YiCard from '@/views/home/children/components/message-text-card/index.vue'
import YqButton from '@/components/yq-button/index.vue'


const commentList= ref<any[]>([] )
const content = ref('')
const nickName = ref('')

interface IMessageDetail {
  item?: any
}

const props =defineProps<IMessageDetail>()

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
    }
  })
}

function handleGetMessageComments() {
  getMessageComments({ messageId: props.item._id }).then(res => {
    commentList.value = res.data
  })
}

defineExpose({
  handleGetMessageComments,
})
</script>

<template>
  <div class="card-detail">
    <div class="top">
      <span class="revoke">联系墙主撕掉该便签</span>
      <span class="report">举报</span>
    </div>
    <yi-card class="card-item" :note="item"></yi-card>
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
  padding-right: 30px;
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
