<script setup lang="ts">
import { RouterLink, useRoute, type _RouterLinkI } from 'vue-router'
import { computed, onMounted, ref, type ComponentPublicInstance, type ComputedRef } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import IconLogo from '@/components/icons/IconLogo.vue'

type Route = {
  name: string
  path: string
}

const navs = ref<HTMLElement[]>([])
const protectorLeading = ref<HTMLElement | null>(null)
const protectorTrailing = ref<HTMLElement | null>(null)
const spacerLeading = ref<HTMLElement | null>(null)
const spacerTrailing = ref<HTMLElement | null>(null)

const route = useRoute()
const currentPath = computed(() => route.path)
const currentRoute = computed(() => {
  return routes.find((route) => route.path === currentPath.value)
})
const currentNav = computed(() => {
  return findNav(currentPath.value)
})

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

function findNav(path: string): HTMLElement | undefined {
  return navs.value.find((nav) => nav.dataset.path === path)
}
</script>

<template>
  <main>
    <nav>
      <div class="content">
        <RouterLink to="/" class="icon-wrapper content">
          <IconLogo class="icon" />
        </RouterLink>
      </div>

      <div class="content blocks">
        <div
          v-for="i in ['kita', 'ryo', 'bocchi', 'nijika']"
          :key="i"
          :class="`tint-${i}`"
          class="block"
        ></div>
      </div>

      <div class="protector leading" ref="protectorLeading"></div>
      <div class="spacer leading" ref="spacerLeading"></div>

      <div class="body">
        <div
          v-for="route in routes"
          :key="route.path"
          :data-path="route.path"
          ref="navs"
          class="link"
        >
          <RouterLink :to="route.path">
            {{ route.name }}
          </RouterLink>
        </div>
      </div>

      <div class="spacer trailing" ref="spacerTrailing"></div>
      <div class="protector trailing" ref="protectorTrailing"></div>

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
  top: 0;
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

.spacer {
  height: 100%;
  background: red;

  &.leading {
    width: 0;
  }

  &.trailing {
    width: 0;
  }

  transition: width 0.4s;
}

.protector {
  height: 100%;
  flex-grow: 1;
  background: blue;
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
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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

.blocks {
  padding: 0 1rem;

  .block {
    height: 0.5rem;
    aspect-ratio: 1/0.25;
    background-color: var(--color);
  }
}

.link {
  transition: scale 0.4s;

  &:hover {
    scale: 1.1;
  }
}
</style>
