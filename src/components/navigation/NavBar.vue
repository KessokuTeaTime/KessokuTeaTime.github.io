<script setup lang="ts">
import { RouterLink } from 'vue-router'
import IconLogo from '@/components/icons/IconLogo.vue'
</script>

<template>
  <main>
    <nav>
      <div class="leading">
        <IconLogo class="logo content" />
      </div>
      <div class="body">
        <RouterLink to="/">Home</RouterLink>
      </div>
      <div class="trailing"></div>
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

.leading,
.body,
.trailing {
  border: 1px solid red;
}

.content {
  margin: 15%;
  height: 100%;
}

.logo {
  aspect-ratio: 1/1;
}
</style>
