<template>
  <div class="new-card p-5">
    <!-- 照片 -->
    <div class="add-photo" v-if="id === 1">
      <input
        type="file"
        name="file"
        id="file"
        multiple
        @change="showPhoto"
        class="absolute z-10 top-[-10px] opacity-0 cursor-pointer h-[74px] w-[64px]"
      />
      <div class="add-bt" v-if="url === ''">
        <span class="text-3xl">+</span>
      </div>
      <div class="change-bt" v-if="url !== ''">
        <span class="text-3xl">+</span>
      </div>
      <div class="photo-div max-h-[200px] w-full bg-[#f0f0f0] overflow-hidden flex items-center">
        <img :src="url" alt="" class="w-full" />
      </div>
    </div>
    <!-- 选择留言色彩 -->
    <ul class="color-list flex pb-3 items-center">
      <template v-for="(item, index) in cardColorOptions" :key="index">
        <li
          @click="changeColor(index)"
          class="item w-6 h-6 mr-2 cursor-pointer rounded-full"
          :style="{ background: item }"
          :class="{ 'border border-[#3b73f0]': index === colorSelected }"
        ></li>
      </template>
    </ul>
    <!-- 卡片 -->
    <div class="card-main h-[240px] w-full p-3" :style="{ background: cardColor[colorSelected] }">
      <textarea
        class="message bg-transparent border-none resize-none h-[172px] w-full p-2 text-lg"
        placeholder="留言..."
        maxlength="96"
        v-model="content"
      ></textarea>
      <input
        class="name w-full p-2 bg-transparent border border-white font-semibold text-lg"
        type="text"
        placeholder="签名"
        v-model="nickName"
      />
    </div>
    <div class="labels mt-5">
      <p class="title text-[#202020] text-lg font-semibold">请选择标签</p>
      <ul class="list flex flex-wrap">
        <li
          class="item py-1 px-2 rounded-2xl mr-2 cursor-pointer text-[#5b5b5b] transition-all duration-300"
          @click="changeLabel(index)"
          :class="{ 'bg-[#EBEBEB] font-semibold text-[#202020]': tagSelected === index }"
          v-for="(item, index) in label[id]"
          :key="index"
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <div class="state mt-5">
      <p class="title text-[#202020] text-lg font-semibold">免责声明</p>
      <p class="detail mt-2 text-sm text-[#949494] leading-5">
        本平台是采用一刻时光的UI设计，为了将该产品添加更多的元素。请不要利用此平台服务制作、上传、下载、复制、发布、传播或者转载如下内容：<br />
        1、反对宪法所确定的基本原则的；<br />
        2、危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；<br />
        3、损害国家荣誉和利益的；<br />
        4、煽动民族仇恨、民族歧视，破坏民族团结的；<br />
        5、破坏国家宗教政策，宣扬邪教和封建迷信的；<br />
        6、散布谣言，扰乱社会秩序，破坏社会稳定的；<br />
        7、散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；<br />
        8、侮辱或者诽谤他人，侵害他人合法权益的；<br />
        9、含有法律、行政法规禁止的其他内容的信息。
      </p>
    </div>
    <div class="footer flex py-5 w-full">
      <yi-button size="max" type="secondary">丢弃</yi-button>
      <yi-button size="max" type="primary" class="ml-3 flex-2" @click="handleAddMessage"
        >确定</yi-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { cardColorOptions, cardColor, label } from '@/config'
import { addMessage, addPhotoMessage } from '@/api/modules'
import YiButton from '@/components/yq-button/index.vue'

interface IProps {
  id: number
}

const emits = defineEmits(['add-success'])
const props = withDefaults(defineProps<IProps>(), {
  id: 0
})

let colorSelected = ref(0)
let tagSelected = ref(0)
let url = ref('')
let content = ref('')
let nickName = ref('')

function changeColor(index: number) {
  colorSelected.value = index
}

function changeLabel(index: number) {
  tagSelected.value = index
}

function getObjectUrl(file: any) {
  let res = null
  if ((window as any).createObjectURL != undefined) {
    res = (window as any).createObjectURL(file)
  } else if ((window as any).URL != undefined) {
    res = (window as any).URL.createObjectURL(file)
  } else if ((window as any).webkitURL != undefined) {
    res = (window as any).webkitURL.createObjectURL(file)
  }
  return res
}

function showPhoto() {
  url.value = getObjectUrl((document.getElementById('file') as any).files[0])
}

/**
 * @desc 发布留言
 * */
const handleAddMessage = async () => {
  // 文本留言
  if (props.id === 0) {
    addMessage({
      type: props.id,
      userId: JSON.parse(localStorage.getItem('userInfo') || '{}').user._id,
      nickName: nickName.value,
      content: content.value,
      tag: tagSelected.value,
      color: colorSelected.value
    }).then((res) => {
      if (res.code === 200) {
        emits('add-success', 'add-text-success')
      }
    })
  }
  // 图片留言
  if (props.id === 1) {
    const formData = new FormData()
    const fileInput = document.getElementById('file') as HTMLInputElement

    // 确保文件存在
    if (fileInput.files.length > 0) {
      const file = (fileInput as any).files[0]
      formData.append('file', file) // 将图片文件追加到 FormData

      // 将其他数据添加到 FormData, 注意将对象转换为字符串
      const DTO = {
        type: props.id,
        userId: JSON.parse(localStorage.getItem('userInfo') || '{}').user._id,
        nickName: nickName.value,
        content: content.value,
        tag: tagSelected.value,
        color: colorSelected.value
      }
      formData.append('DTO', JSON.stringify(DTO)) // 将 DTO 作为字符串追加到 FormData

      try {
        const res = await addPhotoMessage(formData) // 将 FormData 传递给接口
        if (res.code === 200) {
          emits('add-success', 'add-photo-success')
        }
      } catch (error) {
        console.error('上传失败:', error)
      }
    } else {
      console.error('请上传一张图片')
    }
  }
}
</script>
