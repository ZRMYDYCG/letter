<script setup lang="ts">
import { ref } from 'vue'
import YqButton from '../../../../../components/yq-button/index.vue'

interface IProps {
  title: string
}

const emit = defineEmits(['confirm'])
withDefaults(defineProps<IProps>(), {
  title: '标题'
})

let visible = ref(false)
const content = ref('')

/*
* 可接收父组件传递的数据
* */
const openDialog = (item: any) => {
  console.log(item)
  visible.value = true
}

const handleConfirm = () => {
  visible.value = false
}

const handleCancel = () => {
  content.value = ''
  visible.value = false
}

defineExpose({
  openDialog,
  handleCancel
})
</script>

<template>
  <div>
    <el-dialog :title="title" top="30vh"  v-model="visible" width="80%" @close="handleCancel">
      <div class="dialog-content">
        <el-input v-model="content" type="textarea" resize="none" :rows="6" placeholder="请输入内容"></el-input>
      </div>
      <template #footer>
        <div class="dialog-footer flex gap-2 justify-end">
          <yq-button size="min" type="secondary" @click="handleCancel">取消</yq-button>
          <yq-button size="min" @click="handleConfirm">确认</yq-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
@font-face {
  font-family: XiaoKeNaiNao;
  src: url("@/assets/fonts/xknn.ttf");
}
:deep(.el-textarea__inner) {
  font-size: 14px;
  font-family: XiaoKeNaiNao;
}
:deep(.el-textarea__inner) {
  --el-input-focus-border-color: #ccc;
}
:deep(.el-dialog__headerbtn) {
  display: none;
}
:deep(.el-dialog__title) {
  color: #333;
  font-size: 14px;
  font-family: XiaoKeNaiNao;
}
</style>