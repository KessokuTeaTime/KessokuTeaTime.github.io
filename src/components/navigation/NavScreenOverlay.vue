<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { computed, type PropType } from 'vue'

const props = defineProps({
  setEnabled: {
    type: Function as PropType<(isEnabled: boolean) => void>,
    required: true
  },
  isVisible: {
    type: Boolean,
    required: true
  }
})

let opacity = computed(() => (props.isVisible ? 1 : 0))
let animationCurve = computed(() =>
  props.isVisible ? 'cubic-bezier(0.18, 1.51, 0.64, 0.99)' : 'ease-in-out'
)
</script>

<template>
  <div class="full blur">
    <div class="radiant-footer">
      <div
        v-for="i in ['kita', 'ryo', 'bocchi', 'nijika']"
        :key="i"
        :class="`tint-${i}`"
        class="radiant"
      ></div>
    </div>
  </div>
  <nav class="full">
    <div class="nav-content">
      <slot></slot>
    </div>
    <div class="nav-footer">
      <button @click="setEnabled(false)">
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
  filter: blur(calc((1 - v-bind(opacity)) * 1rem));
  transform: translateY(calc(3rem * (1 - v-bind(opacity))))
    scaleY(calc(1 + calc(1 - v-bind(opacity)) * 0.2));

  transition:
    opacity 0.5s,
    filter 0.5s,
    transform 0.5s v-bind(animationCurve);
}

.nav-footer {
  grid-area: 2 / 1 / 3 / 2;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;

  filter: blur(calc((1 - v-bind(opacity)) * 1rem));

  transition: filter 0.4s;
}

.blur {
  --nav-overlay-mask: linear-gradient(to bottom, transparent, black 50%);

  height: 100%;
  width: 100%;

  backdrop-filter: blur(35px) saturate(200%);
  -webkit-backdrop-filter: blur(35px) saturate(200%);
  background-color: var(--color-background-transparent);
  opacity: v-bind(opacity);

  mask: var(--nav-overlay-mask);
  -webkit-mask: var(--nav-overlay-mask);

  transition: opacity 0.3s ease-out;
}

button {
  width: 100%;
  height: 100%;

  opacity: v-bind(opacity);

  &:hover {
    scale: 1.25;
  }

  transition:
    scale 0.4s,
    opacity 0.4s;
}

.radiant-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: stretch;
  align-items: center;

  .radiant {
    flex-grow: 1;
    height: 0.75rem;
    background-color: var(--tint);
    opacity: v-bind(opacity);
    filter: blur(calc(v-bind(opacity) * 5vw));

    transition:
      opacity 0.3s ease-out,
      filter 0.3s ease-out;
  }
}
</style>
