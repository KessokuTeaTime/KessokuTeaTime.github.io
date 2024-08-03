<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import IconLogo from '@/components/icons/IconLogo.vue'
</script>

<template>
  <main>
    <nav>
      <div class="leading">
        <RouterLink to="/" class="content">
          <IconLogo class="icon" />
        </RouterLink>
      </div>
      <div class="body">
        <RouterLink to="/about">About</RouterLink>
      </div>
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

/*
.leading,
.body,
.trailing {
  border: 1px solid red;
}
  */

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
