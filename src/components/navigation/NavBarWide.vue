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

const availableWidth = computed(() => {
  if (spacerLeading.value && spacerTrailing.value) {
    return (
      spacerTrailing.value?.getBoundingClientRect().right -
      spacerLeading.value?.getBoundingClientRect().left
    )
  } else {
    return 0
  }
})

const adjustableWidth = computed(() => {
  if (spacerLeading.value && spacerTrailing.value) {
    return spacerLeading.value.offsetWidth + spacerTrailing.value.offsetWidth
  } else {
    return 0
  }
})

const difference = computed(() => {
  if (spacerLeading.value && spacerTrailing.value) {
    return (
      screen.width -
      spacerTrailing.value.getBoundingClientRect().right -
      spacerLeading.value.getBoundingClientRect().left
    )
  } else {
    return 0
  }
})

const leadingOffset = computed(() => {
  if (spacerLeading.value && spacerTrailing.value && currentNav.value) {
    let min = 0
    let max = adjustableWidth.value

    var offset = 0
    for (let r of routes) {
      if (r.path === currentPath.value) {
        offset += currentNav.value.offsetWidth / 2
        break
      } else {
        let nav = findNav(r.path)
        if (nav) {
          offset += nav.offsetWidth
          console.log(r.path, nav.offsetWidth, offset)
        }
      }
    }

    return Math.max(min, Math.min(max, adjustableWidth.value / 2 + offset + difference.value))
  } else {
    return 0
  }
})

setInterval(() => {
  console.log(currentRoute.value)
  console.log(currentNav.value)
}, 1000)

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
}

.spacer {
  height: 100%;
  flex-grow: 1;
  background: red;

  &.leading {
    width: v-bind(leadingOffset);
  }

  &.trailing {
    width: calc(v-bind(adjustableWidth) - v-bind(leadingOffset));
  }
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
