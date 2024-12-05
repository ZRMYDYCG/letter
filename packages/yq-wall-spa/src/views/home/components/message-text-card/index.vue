<script setup lang="ts">
import { ref, computed } from 'vue'
import { cardColor, label } from '@/config/index.ts'
import { likeMessage, unlikeMessage, getMessages } from '@/api/modules/index.ts'

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
      // 破坏数据流进行修改
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

const handleGetMessage = () => {
  console.log('handleGetMessage')
  getMessages({ messageId: props.note._id }).then((res) => {
    if (res.data) {
      props.note.comment = res.data.comment
    }
  })
}

defineExpose({
  likeMessage,
  unlikeMessage,
  handleGetMessage
})
</script>

<template>
  <div
    class="yi-card h-[240px] p-3 flex flex-col justify-between cursor-pointer"
    :style="{ width: width, background: cardColor[note.color] }"
    @click="itemClick"
  >
    <div class="header flex justify-between pb-4">
      <span class="time text-[#949494] text-[12px]">{{ note.createdAt }}</span>
      <span class="label text-[#202020]">{{ label[0][note.tag] }}</span>
    </div>
    <p class="message h-[140px] text-[#202020] text-[14px]">{{ note.content }}</p>
    <div class="footer flex justify-between">
      <div class="footer-left flex">
        <div class="item flex items-center pr-2">
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
          <span class="value text-[#949494] text-[12px] pl-1">{{ note.like }}</span>
        </div>
        <div class="item flex items-center pr-2">
          <iconpark-icon name="comment" size="18"></iconpark-icon>
          <span class="value text-[#949494] text-[12px] pl-1">{{ note.comment }}</span>
        </div>
      </div>
      <div class="name text-[#202020] text-[16px] font-bold">{{ note.nickName || '匿名' }}</div>
    </div>
  </div>
</template>
