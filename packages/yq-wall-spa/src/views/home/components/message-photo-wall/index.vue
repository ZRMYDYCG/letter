<script setup lang="ts">
import { ref, computed } from 'vue'
import YqImgView from '../yq-img-view/index.vue'
import Error from '@/components/Error/index.vue'
import MessagePhotoCard from '../message-photo-card/index.vue'

interface IProps {
  photoList: any[]
  activePhotoIndex: number
  isLoading: boolean
}

const props = defineProps<IProps>()
const emits = defineEmits(['on-preview', 'switch-img'])

/**
 * 是否开启预览大图模式
 * */
const isShowPreview = computed(() => {
  return props.activePhotoIndex !== -1
})

const handleSwitchImg = (row: string) => {
  emits('switch-img', row)
}

const handlePreview = (index: number) => {
  emits('on-preview', index)
}
</script>

<template>
  <div class="photo mt-[30px] grid grid-cols-5 gap-[4px]">
    <template v-for="(item, index) in photoList" :key="index">
      <message-photo-card @click="handlePreview(index)" :photo="item" />
    </template>
  </div>
  <div
    class="flex w-full h-full justify-center items-center"
    v-if="photoList.length <= 0 && !isLoading"
  >
    <Error :type="1" text="快来留下照片吧~" />
  </div>
  <!-- 大图预览 -->
  <yq-img-view
    :img-url="photoList[activePhotoIndex]?.image"
    v-show="isShowPreview"
    @switch-img="handleSwitchImg"
  ></yq-img-view>
</template>

<style scoped></style>
