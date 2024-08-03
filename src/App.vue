<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/navigation/NavBar.vue'
</script>

<template>
  <header>
    <NavBar />
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
