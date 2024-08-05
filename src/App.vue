<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBarWide from './components/navigation/NavBarWide.vue'
import NavBarNarrow from './components/navigation/NavBarNarrow.vue'
</script>

<template>
  <header>
    <NavBarWide v-if="$screen.width >= 1024" />
    <NavBarNarrow v-else />
  </header>

  <main id="app-container">
    <RouterView />
  </main>
</template>

<style scoped>
#app-container {
  width: 100%;
  padding: 2rem;

  @media (width >= 1024px) {
    margin-top: 4rem;
  }

  @media (width < 1024px) {
    margin-bottom: 4rem;
  }
}
</style>
