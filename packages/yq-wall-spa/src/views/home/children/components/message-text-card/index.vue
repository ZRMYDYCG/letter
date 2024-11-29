<script setup lang="ts">
import { ref, computed } from 'vue'
import { cardColor, label } from '@/config/index.ts'
import { likeMessage, unlikeMessage } from '@/api/modules/index.ts'

interface IProps {
  width?: string
  height?: string
  note?: any
}

const props = defineProps<IProps>()
const emits = defineEmits(['item-click', 'item-like'])

const userId = ref(JSON.parse(localStorage.getItem('userInfo') || '{}')._id)

// 可读可写, 用于管理点赞状态和点赞数量
const likedStatus = computed({
  get() {
    return props.note.likedBy.includes(userId.value)
  },
  set(value: boolean) {
    if (value) {
      // 点赞操作
      handleLikeMessage(props.note._id)
    } else {
      // 取消点赞操作
      handleUnlikeMessage(props.note._id)
    }
  }
})

const itemClick = () => {
  emits('item-click')
}

const handleLikeMessage = (messageId: string) => {
  likeMessage({ messageId }).then((res) => {
    // 更新 note 的状态
    if (res.data) {
      props.note.likedBy.push(userId.value)
      props.note.like += 1 // 增加点赞数量
      emits('item-like', res.data)
    }
  })
}

const handleUnlikeMessage = (messageId: string) => {
  unlikeMessage({ messageId }).then((res) => {
    // 更新 note 的状态
    if (res.data) {
      const index = props.note.likedBy.indexOf(userId.value)
      if (index > -1) {
        props.note.likedBy.splice(index, 1)
        props.note.like -= 1 // 减少点赞数量
      }
      emits('item-like', res.data)
    }
  })
}

defineExpose({
  likeMessage,
  unlikeMessage
});
</script>

<template>
  <div class="yi-card" @click="itemClick" :style="{ width: width, background: cardColor[note.color] }">
    <div class="header">
      <span class="time">{{ note.createdAt }}</span>
      <span class="label">{{ label[0][note.tag] }}</span>
    </div>
    <p class="message">{{ note.content }}</p>
    <div class="footer">
      <div class="footer-left">
        <div class="item">
          <iconpark-icon
              v-if="!likedStatus"
              name="like"
              size="18"
              @click.stop="likedStatus = true"
          ></iconpark-icon>
          <iconpark-icon
              v-else
              name="like-active"
              @click.stop="likedStatus = false"
          ></iconpark-icon>
          <span class="value">{{ note.like }}</span>
        </div>
        <div class="item">
          <iconpark-icon name="comment" size="18"></iconpark-icon>
          <span class="value">{{ note.comment }}</span>
        </div>
      </div>
      <div class="name">{{ note.nickName || '匿名' }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@font-face {
  font-family: XiaoKeNaiNao;
  src: url("@/assets/fonts/xknn.ttf");
}
.yi-card {
  height: 240px;
  padding: 10px 20px 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
}
.yi-card .header {
  display: flex;
  justify-content: space-between;
  padding-bottom: 16px;
}
.yi-card .header span {
  font-size: 12px;
  color: #949494;
}
.yi-card .message {
  height: 140px;
  font-family: XiaoKeNaiNao;
  font-size: 14px;
  color: #202020;
}
.yi-card .footer {
  display: flex;
  justify-content: space-between;
}
.yi-card .footer .footer-left {
  display: flex;
}
.yi-card .footer .footer-left .item {
  display: flex;
  align-items: center;
  padding-right: 8px;
}
.yi-card .footer .footer-left .value {
  font-size: 12px;
  color: #949494;
  padding-left: 4px;
}
.yi-card .footer .name {
  font-family: XiaoKeNaiNao;
  font-size: 16px;
  color: #202020;
  font-weight: 700;
}
</style>