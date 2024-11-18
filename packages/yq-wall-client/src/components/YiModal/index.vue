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
// 入场动画
.modal {
  &-enter {
    &-from {
      transform: translateX(360px);
    }
    &-active {
      transition:  all .3s;
    }
    &-to {
      transform: translateX(0);
    }
  }
}
// 出场动画
.modal {
  &-leave {
    &-from {
      transform: translateX(0);
    }
    &-active {
      transition:  all .3s;
    }
    &-to {
      transform: translateX(360px);
    }
  }
}
.yi-modal {
  position: fixed;
  z-index: 1000;
  top: 52px;
  right: 0;
  width: 360px;
  height: 100%;
  background: rgba(255, 255, 255, 0.80);
  box-shadow: 0 0 20px 0 rgba(0,0,0,0.08);
  backdrop-filter: blur(20px);
  .yi-modal-head {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 20px;
    align-items: center;

    .modal-name {
      font-weight: 600;
      font-size: 17px;
      font-family: XiaoKeNaiNao;
      color: $gray-1;
    }
    .shut {
      color: $gray-2;
      cursor: pointer;
    }
  }
  .yi-modal-main {
    height: 100%;
    width: 100%;
    overflow-y: auto;
    padding-bottom: 160px;
  }
  .yi-modal-main::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 4px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
  }
  .yi-modal-main::-webkit-scrollbar-thumb {
    /*滚动条里面的小方块*/
    border-radius: 4px;
    background-color: rgba(0,0,0,0.2);
  }
  .yi-modal-main::-webkit-scrollbar-track {
    /*滚动条里面的轨道*/
    border-radius: 4px;
    background-color: rgba(0,0,0,0);
  }
}
</style>
