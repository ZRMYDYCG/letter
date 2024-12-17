<script setup lang="ts">
interface IProps {
  imgUrl: string
}

const props = withDefaults(defineProps<IProps>(), {
  imgUrl: ''
})
const emits = defineEmits(['switch-img'])

const handleSwitchImg = (row: string) => {
  if (row === 'left') {
    emits('switch-img', 'left')
  } else {
    emits('switch-img', 'right')
  }
}
</script>

<template>
  <div class="yi-img-view fixed top-0 left-0 w-full h-full pr-[360px] hidden md:block">
    <div
      class="cover absolute top-0 left-0 bg-white bg-opacity-80 backdrop-blur-md h-full w-full dark:bg-opacity-90 dark:bg-gray-800 dark:text-white"
    ></div>
    <div
      class="view-photo absolute top-[80px] w-full py-[82px] pl-[96px] pr-[454px] h-full flex justify-center items-center overflow-y-auto"
    >
      <img :src="imgUrl" alt="#" class="w-full" />
    </div>
    <div
      class="switch sw-left fixed top-1/2 left-5 flex justify-center items-center w-[56px] h-[56px] bg-[#949494] text-white rounded-full cursor-pointer opacity-50 transition-opacity duration-300 hover:opacity-100"
      @click="handleSwitchImg('left')"
    >
      <iconpark-icon size="28" name="arrow-circle-left"></iconpark-icon>
    </div>
    <div
      class="switch sw-right fixed top-1/2 right-[390px] flex justify-center items-center w-[56px] h-[56px] bg-[#949494] text-white rounded-full cursor-pointer opacity-50 transition-opacity duration-300 hover:opacity-100"
      @click="handleSwitchImg('right')"
    >
      <iconpark-icon size="28" name="arrow-circle-right"></iconpark-icon>
    </div>
  </div>
</template>
