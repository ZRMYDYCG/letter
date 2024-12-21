<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtRouteAnnouncer />
    <el-config-provider size="large" :locale="zhCn" :message="{ max: 2, grouping: true }">
      <NuxtPage />
    </el-config-provider>
  </div>
</template>
