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
    default: Color.blue
  }
})

const tint = computed(() => {
  return props.color.normalize().withAlpha(1).toCss()
})
const tintSelection = computed(() => {
  return props.color.normalize().withAlpha(0.1).toCss()
})
</script>

<template>
  <div class="card blur font-space-grotesk">
    <div class="header">
      <img class="avatar" :src="avatar" />
      <div class="title">
        <h1 class="name">
          <slot name="title"> Member </slot>
        </h1>
        <div class="description">
          <slot name="description"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. </slot>
        </div>
      </div>
      <div class="decoration"></div>
    </div>
    <div class="footer blur">
      <div class="body"></div>
    </div>
  </div>
</template>

<style scoped>
.blur {
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.card {
  width: 100%;
  border-radius: 8px;

  background: var(--color-background-mute);
  border: 2px solid var(--color-border);

  display: grid;
  grid-template-areas:
    'header'
    'footer';

  &:hover {
    scale: 1.02;
  }

  transition: scale 0.4s;
  overflow: scroll;

  &::selection,
  *::selection {
    background: v-bind(tintSelection);
  }
}

.header {
  grid-area: header;

  padding: 1rem;
  gap: 1rem;

  display: grid;
  grid-template-areas: 'avatar title deco';
  grid-template-columns: 5rem 1fr auto;

  .avatar {
    grid-area: avatar;

    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    aspect-ratio: 1/1;
    border-radius: 50%;
    background: v-bind(tint);
  }

  .title {
    grid-area: title;

    display: grid;
    grid-template-areas:
      'name'
      'desc';
    grid-template-rows: 0.618fr 0.382fr;

    .name {
      grid-area: name;

      display: flex;
      justify-content: flex-start;
      align-items: end;
    }

    .description {
      grid-area: desc;

      display: flex;
      justify-content: flex-start;
      align-items: start;
    }
  }

  .decoration {
    grid-area: deco;

    display: flex;
    justify-content: flex-end;
    align-items: end;
  }
}

.footer {
  grid-area: footer;

  display: grid;
  grid-template-areas: 'body';

  .body {
    grid-area: body;

    padding: 2rem;
    background: var(--color-background-soft);
  }
}
</style>
