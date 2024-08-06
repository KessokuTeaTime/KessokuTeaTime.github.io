<template>
  <Teleport :to="target" v-if="target" :disabled="!target || disabled">
    <slot></slot>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, type RendererElement } from 'vue'

const props = defineProps<{ to: string | RendererElement | null | undefined; disabled?: boolean }>()

const target = ref<RendererElement | null>(null)

onMounted(() => {
  const observer = new MutationObserver((mutationList, observer) => {
    for (const mutation of mutationList) {
      if (mutation.type !== 'childList') continue
      const el = typeof props.to === 'string' ? document.querySelector(props.to) : props.to
      if (!el) continue
      target.value = el
      observer.disconnect()
      break
    }
  })
  observer.observe(document, { childList: true, subtree: true })
  return () => observer.disconnect()
})
</script>
