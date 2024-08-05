<script setup lang="ts">
import { Color } from '@/scripts/color'
import { computed } from 'vue'

const props = defineProps({
  avatar: {
    type: String,
    default: 'default'
  },
  color: {
    type: Color,
    default: Color.pink
  }
})

const tint = computed(() => {
  return props.color.withAlpha(1).toCss()
})
</script>

<template>
  <div class="card">
    <img class="avatar" :src="avatar" />
  </div>
</template>

<style scoped>
.card {
  width: 100%;
  border-radius: 2rem;
  padding: 2rem;

  background: var(--color-background-transparent);
  border: 2px solid var(--color-border);

  &:hover {
    scale: 1.02;
  }

  transition: scale 0.4s;
}

.avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  aspect-ratio: 1/1;
  border-radius: 50%;
  background: v-bind(tint);
}
</style>
