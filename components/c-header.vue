<template>
  <div class="header">
    <c-scheme-toggle />
  </div>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 1;

  width: 100%;
  height: 50px;
  padding: 5px;
  border-bottom: 1px solid var(--color-border);

  background-color: var(--color-background);
}
</style>
