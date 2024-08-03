<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/navigation/NavBar.vue'
</script>

<template>
  <header>
    <NavBar />
  </header>

  <RouterView />
</template>

<style scoped></style>
