<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { computed } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import IconLogo from '@/components/icons/IconLogo.vue'

type Route = {
  name: string
  path: string
}

const routes: Route[] = [
  {
    name: 'About',
    path: '/about'
  },
  {
    name: 'Projects',
    path: '/projects'
  }
]
</script>

<template>
  <main>
    <nav>
      <div class="leading">
        <RouterLink to="/" class="content">
          <IconLogo class="icon" />
        </RouterLink>
      </div>

      <div class="spacer leading"></div>
      <div class="body">
        <RouterLink v-for="route in routes" :key="route.path" :to="route.path">
          {{ route.name }}
        </RouterLink>
      </div>
      <div class="spacer trailing"></div>

      <div class="trailing">
        <a href="https://github.com/KessokuTeaTime" target="_blank" class="content">
          <FontAwesomeIcon :icon="['fab', 'github']" class="icon" />
        </a>
      </div>
    </nav>
  </main>
</template>

<style scoped lang="scss">
nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;

  > * {
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    * {
      font-family: 'Space Grotesk';
      font-weight: 500;
    }
  }
}

.spacer {
  height: 100%;
  flex-grow: 1;
  background: red;
}

.body {
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  > * {
    margin: 0 1rem;
  }
}

.content {
  padding: 30%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &:has(#logo) {
    padding: 15%;
  }
}

.icon {
  height: 100%;
  aspect-ratio: 1/1;
}

a {
  --color-link: var(--color-text);
  --color-link-soft: var(--color-border-hover);
  --color-link-mute: var(--color-border);

  &:has(.icon) {
    border: transparent;
  }
}
</style>
