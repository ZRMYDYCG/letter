<script setup lang="ts">
import { ref } from 'vue'

import OtherSetting from './components/other-setting.vue'
import FontSetting from './components/font-setting.vue'
import NavSetting from './components/nav-setting.vue'
import ColorSetting from './components/color-setting.vue'
import StyleSetting from './components/style-setting.vue'

const otherSettingRef = ref<InstanceType<typeof OtherSetting> | null>(null)

const copySetting = () => {
  console.log(otherSettingRef.value?.loadingMethod)
}
</script>

<template>
  <div class="p-4 w-full max-w-sm mx-auto h-full dark:text-black">
    <!--  整体风格设置  -->
    <style-setting ref="styleSettingRef"></style-setting>

    <!-- 主题颜色 -->
    <color-setting ref="colorSettingRef"></color-setting>

    <!-- 网站字体 -->
    <font-setting ref="fontSettingRef"></font-setting>

    <!-- 导航模式 -->
    <nav-setting ref="navSettingRef"></nav-setting>

    <!-- 其他设置 -->
    <other-setting ref="otherSettingRef"></other-setting>

    <!-- 提示 -->
    <div class="my-4 bg-yellow-100 text-yellow-700 p-2 rounded-lg">
      <p class="text-sm">设置面板只在开发环境中显示，请手动修改</p>
    </div>

    <!-- 按钮 -->
    <div class="mt-4">
      <button
        class="w-full p-2 border border-gray-300 rounded-lg hover:bg-gray-100"
        @click="copySetting"
      >
        复制设置
      </button>
    </div>
  </div>
</template>

<style scoped></style>
