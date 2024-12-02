<script setup lang="ts">
const props = defineProps({
  imgUrl: {
    type: String,
    default: ''
  }
})

const emits = defineEmits(['click-switch'])

const clickSwitch = (row: string) => {
  if (row === 'left') {
    emits('click-switch', 'left')
  } else {
    emits('click-switch', 'right')
  }
}
</script>

<template>
  <div class="yi-img-view">
    <div class="cover"></div>
    <div class="view-photo">
      <img :src="imgUrl" alt="" />
    </div>
    <div class="switch sw-left flex justify-center items-center" @click="clickSwitch('left')">
      <iconpark-icon size="28" name="arrow-circle-left"></iconpark-icon>
    </div>
    <div class="switch sw-right flex justify-center items-center" @click="clickSwitch('right')">
      <iconpark-icon size="28" name="arrow-circle-right"></iconpark-icon>
    </div>
  </div>
</template>

<style scoped lang="scss">
.yi-img-view {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-right: 360px;
}
.yi-img-view .cover {
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  height: 100%;
  width: 100%;
}
.yi-img-view .view-photo {
  position: absolute;
  top: 80px;
  width: 100%;
  padding: 82px 454px 0 96px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
}
.yi-img-view .view-photo img {
  width: 100%;
}
.yi-img-view .switch {
  background-color: #949494;
  color: #ffffff;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0.5;
  transition: all 0.3s;
}
.yi-img-view .switch:hover {
  opacity: 1;
}
.yi-img-view .sw-left {
  position: fixed;
  top: 50%;
  left: 20px;
}
.yi-img-view .sw-right {
  position: fixed;
  top: 50%;
  right: 390px;
}
</style>
