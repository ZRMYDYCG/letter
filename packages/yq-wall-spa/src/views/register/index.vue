<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '@/api/modules/auth'
import YqButton from '@/components/yq-button/index.vue'

const router = useRouter()

const loading = ref(false)
const params = ref({ username: '', password: '' })
const rePassword = ref('')

const onSubmit = async () => {
  await register({
    identity: 2,  // 普通用户
    username: params.value.username,
    password: params.value.password,
  })

  await router.push('/login')
}
</script>

<template>
  <div class="h-screen w-screen flex justify-center items-center bg-gray-100">
    <div class="flex flex-col items-center bg-gray-100">
      <!-- 顶部 -->
      <div class="flex items-center mb-8">
        <img class="w-12 h-12" src="@/assets/images/logo.svg" alt="" />
        <span class="text-2xl font-semibold text-gray-800 ml-2">通义知语</span>
      </div>

      <!-- main -->
      <div class="w-96 bg-white rounded-lg p-10 shadow-md">
        <p class="text-lg font-semibold mb-8">账号注册</p>

        <div class="mb-5">
          <div class="mb-2">用户名</div>
          <input
            v-model="params.username"
            type="text"
            placeholder="用户名"
            class="w-full h-12 p-4 bg-gray-200 rounded outline-none"
          />
        </div>

        <div class="mb-5">
          <div class="mb-2">密码</div>
          <input
            v-model="params.password"
            type="password"
            placeholder="密码"
            class="w-full h-12 p-4 bg-gray-200 rounded outline-none"
          />
        </div>

        <div class="mb-5">
          <div class="mb-2">确认密码</div>
          <input
            v-model="rePassword"
            type="password"
            placeholder="再次输入密码"
            class="w-full h-12 p-4 bg-gray-200 rounded outline-none"
          />
        </div>

        <!-- 提交 -->
        <yq-button
          class="w-full h-12 bg-gray-800 text-white rounded transition duration-200 hover:bg-gray-700"
          :loading="loading"
          @click="onSubmit"
          >注册</yq-button
        >

        <!-- 返回首页 -->
        <div class="mt-3 flex justify-between">
          <p class="text-blue-500 cursor-pointer" @click="router.push('/')">返回首页</p>
          <p class="text-blue-500 cursor-pointer" @click="router.push('/login')">登录</p>
        </div>
      </div>

      <!-- 提示 -->
      <p class="mt-10 text-center text-gray-500">
        所有 UI 均非原创，仅供学习交流使用，如有侵权请联系删除源码，感谢您的支持！
      </p>
    </div>
  </div>
</template>

<style scoped></style>
