<script setup lang="ts">
import CardMember from '@/components/cards/CardMember.vue'
</script>

<template>
  <div class="card-container">
    <CardMember
      :links="[
        { name: 'GitHub', url: 'https://github.com', faIcon: ['fab', 'github'] },
        { name: 'Test', url: 'https://google.com' }
      ]"
    >
      <template v-slot:name>Member</template>
      <template v-slot:description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna officia cupidatat enim anim
        ea adipisicing deserunt.
      </template>
    </CardMember>
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
