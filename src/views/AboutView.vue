<script setup lang="ts">
import CardMember from '@/components/cards/CardMember.vue'
import { Color } from '@/scripts/color'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
</script>

<template>
  <div class="card-container">
    <CardMember
      :color="Color.red"
      :links="[
        { name: 'GitHub', url: 'https://github.com', faIcon: ['fab', 'github'] },
        { name: 'Test', url: 'https://google.com' }
      ]"
      :tags="[
        'Lorem Ipsum',
        { name: 'A Colored Tag', color: Color.fromName('blue') },
        '世界第一可爱'
      ]"
    >
      <template #name>Member</template>
      <template #description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna officia cupidatat enim anim
        ea adipisicing deserunt.
      </template>

      <template #link-icon:Test>
        <FontAwesomeIcon :icon="['fas', 'chevron-up']" />
      </template>
    </CardMember>

    <CardMember
      avatar="https://github.com/KrLite.png"
      :color="Color.pink"
      :links="[{ name: 'GitHub', url: 'https://github.com/KrLite', faIcon: ['fab', 'github'] }]"
      :tags="['世界第一可爱']"
    >
      <template #name>KrLite</template>
      <template #description>坚守此岸。</template>
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
  gap: 2rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: url('https://picsum.photos/512');
}
</style>
