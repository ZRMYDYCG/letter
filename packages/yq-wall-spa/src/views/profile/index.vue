<script setup>
import { ref, reactive, onMounted } from 'vue'
import { storeToRefs } from "pinia"
import { useRouter } from 'vue-router'
import { portrait } from '@/config'
import ImgCutter from 'vue-img-cutter'
import YqButton from '@/components/yq-button/index.vue'
import useAuthStore from '@/stores/modules/auth.ts'
import { updateUserInfo } from '@/api/modules/user'

const router = useRouter()
const authStore = useAuthStore()

const { userInfo,token } = storeToRefs(authStore)
const loading = ref(false)
const imgFile = ref(null)
const params = reactive({})

const onCutDownImg = (res) => {
  const file = res.file
  imgFile.value = file
  const maxSize = 1024 * 1024 * 5 // 5MB
  if (file.size > maxSize) return
  const reader = new FileReader()
  reader.onload = (e) => {
    params.avatar = e.target.result
  }
  reader.readAsDataURL(file)
}

const handleUpdateUserInfo = async () => {
  const formData = new FormData() // 创建 FormData 对象
  formData.append("DTO", JSON.stringify({
    nickname: params.nickname,
  }))

  if (imgFile.value) {
    formData.append("file", imgFile.value)
  }

  try {
    const res = await updateUserInfo(userInfo.value._id, formData)
    const params = {
      token: token.value,
      user: res.data
    }
    authStore.setUserInfo(params)
    await router.push('/')
  } catch (error) {
    console.error('更新用户信息失败:', error)
  }
}


onMounted(() => {
  params.avatar = userInfo.value.avatar
  params.nickname = userInfo.value.nickname
  params.username = userInfo.value.username
})
</script>

<template>
  <div class="profile flex h-screen w-screen justify-center items-center bg-gray-100">
    <div class="flex flex-col items-center">
      <!-- 顶部 -->
      <div class="flex items-center mb-8">
        <img class="w-12 h-12" src="@/assets/images/logo.svg" alt="" />
        <span class="text-2xl font-semibold text-gray-800 ml-2">通义知语</span>
      </div>
      <!-- main -->
      <div class="w-96 bg-white rounded-lg p-10 shadow-md">
        <p class="text-lg font-semibold mb-8">账号信息</p>
        <div class="mb-5">
          <div class="mb-2">{{ userInfo.identity === 3 ? '游客' : '账号' }}</div>
          <input
            class="input disabled w-full h-12 p-4 bg-gray-200 rounded outline-none"
            :value="userInfo.username"
            type="text"
            readonly
          />
        </div>
        <div class="mb-5">
          <div class="mb-2">昵称</div>
          <input
            class="input w-full h-12 p-4 bg-gray-200 rounded outline-none"
            v-model="params.nickname"
            type="text"
            placeholder="取一个有趣的昵称"
          />
        </div>
        <div class="mb-5">
          <div class="mb-2">头像</div>
          <div class="relative">
            <!-- 判断头像是否有效 -->
            <img
              alt="头像"
              class="w-20 h-20 rounded-lg"
              :src="params.avatar || userInfo.avatar"
              v-if="String(userInfo.avatar)?.startsWith('http') || String(params.avatar)?.startsWith('data:')"
            />
            <!--  使用系统的默认的渐变头像  -->
            <div
              class="w-20 h-20 rounded-lg"
              v-else
              :style="{ backgroundImage: portrait[userInfo.avatar] }"
            ></div>
            <!-- 头像裁剪 -->
            <img-cutter
              ref="imgCutterModal"
              @cutDown="onCutDownImg"
              :boxWidth="700"
              :boxHeight="458"
              :cutWidth="240"
              :cutHeight="240"
            >
              <template #open>
                <div
                  class="absolute w-20 h-20 inset-0 cursor-pointer flex items-center justify-center bg-black bg-opacity-30 transition-opacity duration-300 opacity-0 hover:opacity-100"
                >
                  <iconpark-icon name="change" class="text-white text-2xl"></iconpark-icon>
                </div>
              </template>
            </img-cutter>
          </div>
        </div>

        <!-- 提交 -->
        <yq-button
          class="w-full bg-gray-800 text-white h-12 rounded transition duration-200 hover:bg-gray-700"
          @click="handleUpdateUserInfo"
          >修改</yq-button
        >

        <!-- 返回首页 -->
        <div class="mt-3 flex justify-between">
          <p class="text-blue-500 cursor-pointer" @click="router.push('/')">返回首页</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.disabled {
  cursor: not-allowed;
  color: #949494;
}

:deep(.vue-img-cutter) {
}
</style>
