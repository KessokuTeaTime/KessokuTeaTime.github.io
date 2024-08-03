<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <main>
    <nav>
      <div class="leading"></div>
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
  height: 5rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;

  > * {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
  }
}

.leading,
.body,
.trailing {
  border: 1px solid red;
}
</style>
