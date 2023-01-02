<template>
  <div class="container">
    <c-header />
    <div class="body">
      <nuxt-page />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
}

.body {
  flex-grow: 1;
}
</style>
