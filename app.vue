<template>
  <div class="container">
    <c-header />
    <div class="body">
      <c-navbar />
      <div class="main">
        <nuxt-page />
      </div>
    </div>
  </div>
  <c-note-modal />
</template>

<script setup lang="ts">
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.body {
  display: flex;
}

.main {
  flex-grow: 1;
}
</style>
