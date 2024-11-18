<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  isModal: {
    type: Boolean
  }
})

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
        <span class="shut" @click="changeModal">x</span>
      </div>
      <div class="yi-modal-main">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<style scoped lang="scss">
@font-face {
  font-family: XiaoKeNaiNao;
  src: url("@/assets/fonts/xknn.ttf");
}
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
  backdrop-filter: blur(20px);
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
  color: #5B5B5B;
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
