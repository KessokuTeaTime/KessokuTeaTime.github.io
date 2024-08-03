<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBarWide from './components/navigation/NavBarWide.vue'
import NavBarNarrow from './components/navigation/NavBarNarrow.vue'
</script>

<template>
  <header>
    <NavBarWide v-if="$screen.width > 1024" />
    <NavBarNarrow v-else />
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
main {
  margin-top: 4rem;
}
</style>
