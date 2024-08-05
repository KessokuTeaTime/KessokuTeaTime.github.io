<script setup lang="ts">
import CardMember from '@/components/cards/CardMember.vue'
</script>

<template>
  <div class="card-container">
    <CardMember />
  </div>
</template>

<style scoped>
.card-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}
</style>

<style>
#app {
  background: url('https://picsum.photos/512');
}
</style>
