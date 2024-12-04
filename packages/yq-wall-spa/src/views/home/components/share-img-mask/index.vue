<script setup lang="ts">
import YqButton from '@/components/yq-button/index.vue'

interface IProps {
  shareImgUrl: string
}

defineProps<IProps>()
const emits = defineEmits(['close-img-share-mask'])

const handleDownloadImg = (base64: string) => {
  const link = document.createElement('a')
  link.href = base64
  link.download = new Date().getTime() + '.png'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const closeImgShareDialog = () => {
  emits('close-img-share-mask', true)
}
</script>

<template>
  <div
    class="w-screen h-screen fixed top-0 left-0 z-[9999] bg-black bg-opacity-90 flex justify-center items-center"
    v-if="!shareImgUrl"
    @click="closeImgShareDialog"
  >
    <div class="z-[10000] rounded-[12px] overflow-hidden bg-white backdrop-blur-md" @click.stop>
      <img :src="shareImgUrl" alt="#" />
      <div class="flex justify-center w-full gap-4 m-3">
        <yq-button type="secondary" @click="closeImgShareDialog">销毁</yq-button>
        <yq-button @click="handleDownloadImg(shareImgUrl)">下载</yq-button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
