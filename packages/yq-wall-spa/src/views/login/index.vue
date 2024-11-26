<template>
    <div class="yq-login w-screen h-screen flex justify-center items-center">
        <div class="login-panel flex flex-col justify-center items-center gap-3">
            <h1 class="text-gray-800 text-3xl">登录</h1>
            <input v-model="username" class="outline-none border-black-300 border-2 rounded-md w-96 p-2"></input>
            <input v-model="password" class="outline-none border-black-300 border-2 rounded-md w-96 p-2" type="password"></input>
            <button @click="handleLogin" class="w-32 h-10 bg-black text-white rounded-md">登录</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { login } from '../../api/modules/index'

const username = ref('')
const password = ref('')

const handleLogin = () => {
    console.log(username.value, password.value)

    login({username: username.value, password: password.value}).then((res) => {
        console.log(res)
    })
}
</script>

<style scoped></style>
