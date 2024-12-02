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
  <div class="yi-img-view fixed top-0 left-0 w-full h-full pr-[360px]">
    <div
      class="cover absolute top-0 left-0 bg-white bg-opacity-80 backdrop-blur-md h-full w-full"
    ></div>
    <div
      class="view-photo absolute top-[80px] w-full py-[82px] pl-[96px] pr-[454px] h-full flex justify-center items-center overflow-y-auto"
    >
      <img :src="imgUrl" alt="#" class="w-full" />
    </div>
    <div
      class="switch sw-left fixed top-1/2 left-5 flex justify-center items-center w-[56px] h-[56px] bg-[#949494] text-white rounded-full cursor-pointer opacity-50 transition-opacity duration-300 hover:opacity-100"
      @click="clickSwitch('left')"
    >
      <iconpark-icon size="28" name="arrow-circle-left"></iconpark-icon>
    </div>
    <div
      class="switch sw-right fixed top-1/2 right-[390px] flex justify-center items-center w-[56px] h-[56px] bg-[#949494] text-white rounded-full cursor-pointer opacity-50 transition-opacity duration-300 hover:opacity-100"
      @click="clickSwitch('right')"
    >
      <iconpark-icon size="28" name="arrow-circle-right"></iconpark-icon>
    </div>
  </div>
</template>
