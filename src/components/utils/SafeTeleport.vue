<template>
  <Teleport
    :to="to"
    v-if="to"
    :disabled="!to || disabled"
    :key="autoUpdate ? String(to) : undefined"
  >
    <slot></slot>
  </Teleport>
</template>

<script setup lang="ts">
import { type RendererElement } from 'vue'

defineProps<{
  to: string | RendererElement | null | undefined
  disabled?: boolean
  autoUpdate?: boolean
}>()
</script>
