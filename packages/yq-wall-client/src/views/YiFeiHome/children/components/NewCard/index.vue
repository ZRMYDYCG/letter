<script setup lang="ts">
import { ref } from 'vue'
import { cardColorOptions, cardColor, label } from '@/utils/data'
import YiButton from '@/components/YiButton/index.vue'
import { insertWall } from '@/api/Home'
const props = defineProps({
  id: {
    type: Number,
    default: 0
  }
})

// 颜色选择
let colorSelected = ref(0)
const changeColor = (index: number) => {
  colorSelected.value = index
}

// 标签选择
let labelSelected = ref(0)

const changeLabel = (index: number) => {
  labelSelected.value = index
}

let url = ref('')
const getObjectUrl = (file: any) => {
  let res = null
  if(window.createObjectURL != undefined) {
    res = window.createObjectURL(file)
  } else if(window.URL != undefined) {
    res = window.URL.createObjectURL(file)
  } else if(window.webkitURL != undefined) {
    res = window.webkitURL.createObjectURL(file)
  }
  return res
}
const showPhoto = () => {
  url.value = getObjectUrl(document.getElementById("file").files[0])
}

// 发布留言
let message = ref('')
let name = ref('')
const handleInsertWallApi = async () => {
  const res = await insertWall({
    type: Number(props.id),
    message: message.value,
    name: name.value,
    userId: 1,
    moment: new Date(),
    label: labelSelected.value,
    color: colorSelected.value,
    imgUrl: ''
  })
  console.log(res)
}
</script>

<template>
  <div class="new-card">
    <ul class="color-list" v-if="id === 0">
      <template v-for="(item, index) in cardColorOptions" :key="index">
        <li @click="changeColor(index)" class="item" :style="{ background: item }" :class="{ selected: index === colorSelected }"></li>
      </template>
    </ul>
    <!--  照片  -->
    <div class="add-photo" v-if="id === 1">
      <input type="file" name="file" id="file" mutiple="multiple" @change="showPhoto"></input>
      <div class="add-bt" v-if="url === ''">
        <span>+</span>
      </div>
      <div class="change-bt" v-if="url != ''">
        <span>+</span>
      </div>
      <div class="photo-div">
        <img :src="url" alt="">
      </div>
    </div>
    <!--  卡片  -->
    <div class="card-main" v-if="id === 0" :style="{ background: cardColor[colorSelected] }">
      <textarea class="message" placeholder="留言..." maxlength="96" v-model="message"></textarea>
      <input class="name" type="text" placeholder="签名" v-model="name" />
    </div>
    <div class="labels">
      <p class="title">请选择标签</p>
      <ul class="list">
        <li class="item" @click="changeLabel(index)" :class="{ labelSelected: labelSelected === index }" v-for="(item, index) in label[id]" :key="index">{{ item }}</li>
      </ul>
    </div>
    <div class="state">
      <p class="title">免责声明</p>
      <p class="detail">
        一小池勺是采用一刻时光的UI设计，为了将该产品添加更多的元素。请不要利用此平台服务制作、上传、下载、复制、发布、传播或者转载如下内容：<br />
        1、反对宪法所确定的基本原则的；<br />
        2、危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家 统一的；<br />
        3、损害国家荣誉和利益的；<br />
        4、煽动民族仇恨、民族歧视，破坏民族团结的；<br />
        5、破坏国家宗教政策，宣扬邪教和封建迷信的；<br />
        6、散布谣言，扰乱社会秩序，破坏社会稳定的；<br />
        7、散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；<br />
        8、侮辱或者诽谤他人，侵害他人合法权益的；<br />
        9、含有法律、行政法规禁止的其他内容的信息。
      </p>
    </div>
    <div class="footer">
      <yi-button size="max" type="secondary">丢弃</yi-button>
      <yi-button size="max" type="primary" class="confirm" @click="handleInsertWallApi">确定</yi-button>
    </div>
  </div>
</template>

<style scoped>
@font-face {
  font-family: XiaoKeNaiNao;
  src: url("@/assets/fonts/xknn.ttf");
}
.new-card {
  padding: 0 20px;
}
.new-card .color-list {
  display: flex;
  padding-bottom: 12px;
  align-items: center;
}
.new-card .color-list .item {
  width: 24px;
  height: 24px;
  margin-right: 8px;
  cursor: pointer;
}
.new-card .color-list .selected {
  border: 1px solid #3b73f0;
}
.new-card .add-photo {
  padding-bottom: 20px;
  position: relative;
}
.new-card .add-photo #file {
  position: absolute;
  z-index: 10;
  top: -10px;
  height: 74px;
  width: 64px;
  opacity: 0;
  cursor: pointer;
}
.new-card .add-photo .add-bt {
  width: 64px;
  height: 64px;
  border: 1px solid #949494;
  border-radius: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.new-card .photo-div {
  max-height: 200px;
  width: 100%;
  background: #f0f0f0;
  overflow: hidden;
  display: flex;
  align-items: center;
}
.new-card .photo-div img {
  width: 100%;
}
.new-card .change-bt {
  position: absolute;
  top: 12px;
  left: 12px;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}
.new-card .card-main {
  height: 240px;
  width: 100%;
  padding: 12px;
}
.new-card .card-main .message {
  background: none;
  border: none;
  resize: none;
  height: 172px;
  width: 100%;
  padding: 8px;
  font-size: 16px;
  font-family: XiaoKeNaiNao;
}
.new-card .card-main .name {
  width: 100%;
  padding: 8px;
  background: none;
  border: 1px solid #ffffff;
  font-family: XiaoKeNaiNao;
  font-weight: 600;
  font-size: 16px;
}
.new-card .labels {
  margin-top: 20px;
}
.new-card .labels .title {
  color: #202020;
  font-size: 16px;
  font-weight: 600;
  font-family: XiaoKeNaiNao;
}
.new-card .labels .list {
  display: flex;
  flex-wrap: wrap;
}
.new-card .labels .list .item {
  padding: 2px 10px;
  border-radius: 20px;
  margin: 16px 4px 0 0;
  cursor: pointer;
  color: #5B5B5B;
  transition: all 0.3s;
}
.new-card .labels .list .labelSelected {
  background: #EBEBEB;
  font-weight: 600;
  color: #202020;
}
.new-card .state {
  margin-top: 20px;
}
.new-card .state .title {
  color: #202020;
  font-size: 16px;
  font-weight: 600;
  font-family: XiaoKeNaiNao;
}
.new-card .state .detail {
  margin-top: 10px;
  font-size: 12px;
  color: #949494;
  line-height: 18px;
}
.new-card .footer {
  padding: 20px 0;
  display: flex;
  width: 100%;
}
.new-card .footer .confirm {
  margin-left: 15px;
  flex: 2;
}
</style>
