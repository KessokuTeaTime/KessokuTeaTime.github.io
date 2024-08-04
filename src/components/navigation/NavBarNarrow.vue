<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { routes } from '@/router'
import { computed, ref } from 'vue'
import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome'
import IconLogo from '@/components/icons/IconLogo.vue'
import NavScreenOverlay from './NavScreenOverlay.vue'

const route = useRoute()
const currentPath = computed(() => route.path)
const currentRoute = computed(() => routes.find((r) => r.path === currentPath.value))

const isScreenOverlayVisible = ref(false)
const isScreenOverlayEnabled = ref(false)
let screenOverlayTimeout: number | undefined

function setScreenOverlayEnabled(isEnabled: boolean) {
  if (isEnabled) {
    clearTimeout(screenOverlayTimeout)

    isScreenOverlayEnabled.value = isEnabled
    screenOverlayTimeout = setTimeout(() => {
      isScreenOverlayVisible.value = isEnabled
    }, 1)
  } else {
    clearTimeout(screenOverlayTimeout)

    isScreenOverlayVisible.value = isEnabled
    screenOverlayTimeout = setTimeout(() => {
      isScreenOverlayEnabled.value = isEnabled
    }, 500)
  }
}
function toggleScreenOverlay() {
  setScreenOverlayEnabled(!isScreenOverlayVisible.value)
}
</script>

<template>
  <NavScreenOverlay
    v-if="isScreenOverlayEnabled"
    :setEnabled="setScreenOverlayEnabled"
    :isVisible="isScreenOverlayVisible"
  >
    <div class="nav-container">
      <RouterLink
        v-for="route in routes"
        :key="route.path"
        :to="route.path"
        @click="toggleScreenOverlay"
      >
        {{ route.name }}
      </RouterLink>
      <div class="separator"></div>
      <RouterLink to="/" @click="toggleScreenOverlay">Home</RouterLink>
    </div>
  </NavScreenOverlay>

  <nav class="blur">
    <div class="content">
      <RouterLink to="/" class="icon-wrapper">
        <IconLogo class="icon" />
      </RouterLink>
    </div>

    <button @click="toggleScreenOverlay" class="content">
      <FontAwesomeLayers>
        <FontAwesomeIcon :icon="['fas', 'chevron-up']" transform="up-3 shrink-6" />
        <FontAwesomeIcon :icon="['fas', 'chevron-down']" transform="down-3 shrink-6" />
      </FontAwesomeLayers>
      {{ currentPath === '/' ? 'Home' : currentRoute?.name || 'Unknown' }}
    </button>

    <div class="content">
      <a href="https://github.com/KessokuTeaTime" target="_blank" class="icon-wrapper">
        <div class="icon"><FontAwesomeIcon :icon="['fab', 'github']" /></div>
      </a>
    </div>
  </nav>
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

  &:not(.router-link-active, .icon-wrapper) {
    --color-link: var(--color-border-hover);

    &:hover {
      --color-link: var(--color-text);
      padding-bottom: 1rem;
    }
  }

  &.router-link-active {
    --color-link-soft: var(--color-link);
    --color-link-mute: var(--color-link);
  }

  font-family: 'Space Grotesk';
  font-weight: 500;
  font-size: 2rem;
}

.separator {
  height: 2.5rem;
}

.nav-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: first baseline;
  height: 100%;
  padding: 4rem 0;
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
  display: flex;
  justify-content: center;
  align-items: center;

  .icon {
    height: 100%;
    aspect-ratio: 1/1;
    padding: 25%;
    display: flex;
    justify-content: center;
    align-items: center;

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

  &:hover {
    scale: 0.9;
  }

  transition: scale 0.4s;
}
</style>
