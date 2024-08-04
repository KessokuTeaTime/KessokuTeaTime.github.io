<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { onMounted, ref, type PropType } from 'vue'

defineProps({
  setVisible: {
    type: Function as PropType<(isVisible: boolean) => void>,
    required: true
  }
})

const opacity = ref(0)

onMounted(() => {
  setTimeout(() => {
    opacity.value = 1
  }, 1)
})
</script>

<template>
  <div class="full blur"></div>
  <nav class="full">
    <div class="nav-content">
      <slot></slot>
    </div>
    <div class="nav-footer">
      <button @click="setVisible(false)" class="icon">
        <FontAwesomeIcon :icon="['fas', 'xmark']" size="2x" />
      </button>
    </div>
  </nav>
</template>

<style scoped>
.full {
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;

  z-index: 2;
}

nav {
  display: grid;
  grid-template: 1fr 4rem / 1fr;
}

.nav-content {
  grid-area: 1 / 1 / 2 / 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  opacity: v-bind(opacity);
  transform: translateY(calc(1rem * (1 - v-bind(opacity))))
    scaleY(calc(1 + calc(1 - v-bind(opacity)) * 0.2));
  transition:
    opacity 0.5s,
    transform 0.5s cubic-bezier(0.18, 1.51, 0.64, 0.99);
}

.nav-footer {
  grid-area: 2 / 1 / 3 / 2;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.blur {
  --nav-overlay-mask: linear-gradient(to bottom, transparent, black 25%);

  height: 100%;
  width: 100%;

  backdrop-filter: blur(35px) saturate(200%);
  -webkit-backdrop-filter: blur(35px) saturate(200%);
  background-color: var(--color-background-transparent);
  opacity: v-bind(opacity);

  mask: var(--nav-overlay-mask);
  -webkit-mask: var(--nav-overlay-mask);

  transition: opacity 0.4s;
}

button {
  background: transparent;
  border: none;

  &:hover {
    scale: 1.1;
  }

  transition: scale 0.4s;
}

.icon {
  height: 100%;
  aspect-ratio: 1/1;
}
</style>
