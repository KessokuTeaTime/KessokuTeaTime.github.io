<template>
  <div class="hero">
    <h1
      v-for="i in ['kita', 'ryo', 'bocchi', 'nijika']"
      :key="i"
      :class="`tint-${i}`"
      class="title"
    >
      <span class="font-mplus-2p">結束</span>
      &nbsp;
      <span class="font-naishomoji">ティータイム</span>
    </h1>
  </div>
  <div class="spacer"></div>
</template>

<style scoped>
.title {
  font-size: min(3rem, calc(85vw / 9));
}

.hero {
  height: calc(100vh - 8rem - 2 * 2rem);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media (width < 1024px) {
    height: calc(100vh - 2 * 2rem);
  }
}

.spacer {
  height: 200vh;
}
</style>
