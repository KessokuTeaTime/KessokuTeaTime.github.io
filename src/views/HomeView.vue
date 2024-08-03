<template>
  <h1 v-for="i in ['kita', 'ryo', 'bocchi', 'nijika']" :key="i" :class="`tint-${i}`">
    <span class="font-mplus-2p">結束</span>
    &nbsp;
    <span class="font-naishomoji">ティータイム</span>
  </h1>
</template>

<style scoped>
h1 {
  font-size: 3rem;
}
</style>
