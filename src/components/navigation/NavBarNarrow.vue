<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { routes } from '@/router'
import { computed } from 'vue'
import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome'
import IconLogo from '@/components/icons/IconLogo.vue'

const route = useRoute()
const currentPath = computed(() => route.path)
const currentRoute = computed(() => routes.find((r) => r.path === currentPath.value))
</script>

<template>
  <main>
    <nav class="blur">
      <div class="content">
        <RouterLink to="/" class="icon-wrapper">
          <IconLogo class="icon" />
        </RouterLink>
      </div>

      <button class="content">
        <FontAwesomeLayers>
          <FontAwesomeIcon :icon="['fas', 'chevron-up']" transform="up-3 shrink-6" />
          <FontAwesomeIcon :icon="['fas', 'chevron-down']" transform="down-3 shrink-6" />
        </FontAwesomeLayers>
        {{ currentRoute?.name || 'Home' }}
      </button>

      <div class="content">
        <a href="https://github.com/KessokuTeaTime" target="_blank" class="icon-wrapper">
          <div class="icon"><FontAwesomeIcon :icon="['fab', 'github']" /></div>
        </a>
      </div>
    </nav>
  </main>
</template>

<style scoped>
nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;

  * {
    font-family: 'Space Grotesk';
    font-weight: 500;
  }
}

.blur {
  backdrop-filter: blur(35px) saturate(200%);
  -webkit-backdrop-filter: blur(35px) saturate(200%);
  background-color: var(--color-background-transparent);
  border-top: 2px solid var(--color-border);

  transition: border 0.4s;
}

a {
  --color-link: var(--color-text);
  --color-link-soft: var(--color-border-hover);
  --color-link-mute: var(--color-border);

  &.icon-wrapper {
    border: transparent;
  }

  &.router-link-active {
    --color-link-soft: var(--color-link);
    --color-link-mute: var(--color-link);
  }
}

.content {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &.grow {
    flex-grow: 1;
  }
}

.icon-wrapper {
  padding: 0.5rem;
  height: 100%;

  .icon {
    height: 100%;
    aspect-ratio: 1/1;
    padding: 25%;

    > * {
      height: 100%;
      width: 100%;
    }

    &:has(#logo) {
      padding: 5%;
    }
  }
}

button {
  font-size: 1.2rem;

  background: transparent;
  border: transparent;

  &:hover {
    scale: 0.9;
  }

  transition: scale 0.4s;
}
</style>
