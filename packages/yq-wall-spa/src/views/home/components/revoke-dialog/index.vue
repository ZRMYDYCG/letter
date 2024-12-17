<script setup lang="ts">
import { ref } from 'vue'
import YqButton from '@/components/yq-button/index.vue'

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
    <el-dialog :title="title" top="30vh" v-model="visible" width="80%" @close="handleCancel">
      <div class="dialog-content">
        <el-input
          v-model="content"
          type="textarea"
          resize="none"
          :rows="6"
          placeholder="请输入内容"
          class="textarea"
        ></el-input>
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
:deep(.el-textarea__inner) {
  font-size: 14px;
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
}

/* 移动端适配 */
@media (max-width: 768px) {
  :deep(.el-dialog) {
    width: 90%; /* 对话框宽度设为90% */
    max-width: 400px; /* 限制最大宽度 */
    margin: auto; /* 居中显示 */
    position: fixed;
    top: 50%; /* 垂直居中 */
    left: 50%;
    transform: translate(-50%, -50%); /* 确保完全居中 */
  }

  :deep(.dialog-content) {
    padding: 10px; /* 内容区域内边距 */
  }

  :deep(.el-dialog__footer) {
    padding: 10px; /* 底部按钮间距 */
    justify-content: space-between; /* 分散按钮 */
  }

  :deep(.el-input) {
    font-size: 16px; /* 增大输入框字体以适应移动端 */
  }
}

/* PC大屏适配 */
@media (min-width: 769px) {
  :deep(.el-dialog) {
    width: 60%; /* 对话框在大屏上的宽度 */
    max-width: 800px; /* 设置最大宽度 */
  }
}
</style>
