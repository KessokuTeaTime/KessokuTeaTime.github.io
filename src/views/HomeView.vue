<template>
  <div class="ceilling"></div>
  <h1 v-for="i in ['kita', 'ryo', 'bocchi', 'nijika']" :key="i" :class="`tint-${i}`">
    <span class="font-mplus-2p">結束</span>
    &nbsp;
    <span class="font-naishomoji">ティータイム</span>
  </h1>
  <div class="spacer"></div>
</template>

<style scoped>
h1 {
  font-size: 3rem;
}

.hero {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.ceilling {
  width: 100%;
  height: 20vh;
}

.spacer {
  width: 100%;
  height: 200vh;
}
</style>
