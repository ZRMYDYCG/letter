<script setup lang="ts">
import type { ShallowRef } from 'vue'
import { computed, reactive, ref, useTemplateRef } from 'vue'
import YqImgView from '../yq-img-view/index.vue'
import Error from '@/views/home/components/empty/index.vue'
import 'vue-waterfall-plugin-next/dist/style.css'
import { LazyImg, Waterfall } from 'vue-waterfall-plugin-next'
import { random } from 'lodash-es'
import errorImg from '@/assets/images/error.png'
import loadingImg from '@/assets/images/loading.png'

interface IProps {
  photoList: any[]
  activePhotoIndex: number
  isLoading: boolean
}

const props = defineProps<IProps>()
const emits = defineEmits(['on-preview', 'switch-img'])

const waterFallRef = useTemplateRef('waterFallRef') as ShallowRef<HTMLElement>

/**
 * 可读写loading状态
 * */
const loading = computed({
  get() {
    return props.isLoading
  },
  set(value: boolean) {}
})

/**
 * @description 瀑布留插件配置
 * */
const options = reactive({
  rowKey: 'id', // 数据唯一的字段，比如列表里面的id, 如果要删除卡片，该字段为必填
  width: 310, // 卡片宽度
  // 自定义行显示个数，主要用于对移动端的适配
  breakpoints: {
    1200: {
      // 当屏幕宽度小于等于1200
      rowPerView: 4
    },
    800: {
      // 当屏幕宽度小于等于800
      rowPerView: 3
    },
    500: {
      // 当屏幕宽度小于等于500
      rowPerView: 2
    }
  },
  gutter: 15, // 卡片间隙
  hasAroundGutter: true, // 容器四周是否有 gutter 边距
  posDuration: 600, // 卡片移动到正确位置的动画时间,默认 300
  animationPrefix: 'animate__animated', // 动画前缀
  animationEffect: 'fadeIn', // 卡片入场动画，默认只有 fadeIn，引入 animation.css 后可使用其他动画
  animationDuration: 1000, // 卡片入场动画执行时间（单位毫秒）
  animationDelay: 300, // 卡片入场动画延迟（单位毫秒）
  animationCancel: false, // 是否取消动画
  backgroundColor: 'transparent', // 背景颜色
  // 懒加载属性
  loadProps: {
    loading: loadingImg,
    error: errorImg,
    ratioCalculator: (width: number, height: number) => {
      // 设置了最小宽高比
      const minRatio = random(3, 4, true)
      const maxRatio = random(3, 4, true)
      return minRatio / maxRatio
    }
  },
  lazyload: true, // 是否开启懒加载
  crossOrigin: true, // 图片加载是否开启跨域
  delay: 300, // 布局刷新的防抖时间，默认 300ms 内没有再次触发才刷新布局
  align: 'center' // 卡片的对齐方式，可选值为：left,center,right
})

// 渲染完成
const afterRender = () => {
  loading.value = false
}

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
  <div ref="waterFallRef" v-if="photoList.length > 0 && !isLoading">
    <Waterfall :list="photoList" v-bind="options" @after-render="afterRender">
      <!-- fix: 新版插槽数据获取 -->
      <template #default="{ item, index }">
        <div class="card-container relative bg-transparent" @click="handlePreview(index)">
          <LazyImg
            :url="item.image.replace('http://localhost:5174', '/api')"
            class="rounded-md cursor-pointer"
          />
        </div>
      </template>
    </Waterfall>
  </div>
  <div
    class="flex w-full justify-center items-center"
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

<style scoped>
.card-container {
  position: relative;
}

.card-container .lazy__img[lazy='loading'] {
  opacity: 0;
  transition: opacity 2s;
}

.card-container .lazy__img[lazy='loaded'] {
  opacity: 1;
}

.card-container .lazy__img[lazy='error'] {
  opacity: 1;
  transform: scale(1);
}
</style>
