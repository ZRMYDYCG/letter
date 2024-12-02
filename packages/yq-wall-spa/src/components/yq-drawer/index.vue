<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const title = computed(() => {
  if (route.query.id === '0') {
    return '写留言'
  } else if (route.query.id === '1') {
    return '留照片'
  }
})

interface IProps {
  isModal: boolean
}

defineProps<IProps>()

const emits = defineEmits(['change-modal'])
const changeModal = () => {
  emits('change-modal')
}
</script>

<template>
  <transition name="modal">
    <div class="yi-modal" v-if="isModal">
      <div class="yi-modal-head">
        <p class="modal-name">{{ title }}</p>
        <span class="shut" @click="changeModal">
          <iconpark-icon size="20" name="close"></iconpark-icon>
        </span>
      </div>
      <div class="yi-modal-main">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.modal-enter-from {
  transform: translateX(360px);
}
.modal-enter-active {
  transition: all 0.3s;
}
.modal-enter-to {
  transform: translateX(0);
}
.modal-leave-from {
  transform: translateX(0);
}
.modal-leave-active {
  transition: all 0.3s;
}
.modal-leave-to {
  transform: translateX(360px);
}
.yi-modal {
  position: fixed;
  z-index: 1000;
  top: 52px;
  right: 0;
  width: 360px;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.08);
}
.yi-modal .yi-modal-head {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  align-items: center;
}
.yi-modal .yi-modal-head .modal-name {
  font-weight: 600;
  font-size: 17px;
  font-family: XiaoKeNaiNao;
  color: #202020;
}
.yi-modal .yi-modal-head .shut {
  color: #5b5b5b;
  cursor: pointer;
}
.yi-modal .yi-modal-main {
  height: 100%;
  width: 100%;
  overflow-y: auto;
  padding-bottom: 160px;
}
.yi-modal .yi-modal-main::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}
.yi-modal .yi-modal-main::-webkit-scrollbar-thumb {
  /*滚动条里面的小方块*/
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.2);
}
.yi-modal .yi-modal-main::-webkit-scrollbar-track {
  /*滚动条里面的轨道*/
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0);
}
</style>
