<script setup lang="ts">
import { defineProps, useSlots, computed } from 'vue'

interface IProps {
  activeIcon?: string
  inactiveIcon?: string
  activeColor?: string
  inactiveColor?: string
}

const props = defineProps<IProps>()
const slots = useSlots()

const activeIconComponent = computed(() => {
  return props.activeIcon ? () => `iconpark-icon size="20" name="${props.activeIcon}"` : null
})

const inactiveIconComponent = computed(() => {
  return props.inactiveIcon ? () => `iconpark-icon size="20" name="${props.inactiveIcon}"` : null
})
</script>

<template>
  <el-switch v-bind="$attrs">
    <template #active-icon>
      <component :is="activeIconComponent" v-if="activeIconComponent" />
      <slot name="active-icon" v-else />
    </template>
    <template #inactive-icon>
      <component :is="inactiveIconComponent" v-if="inactiveIconComponent" />
      <slot name="inactive-icon" v-else />
    </template>
  </el-switch>
</template>

<style scoped></style>
