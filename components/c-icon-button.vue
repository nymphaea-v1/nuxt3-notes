<template>
  <c-button
    class="button"
    type="borderless"
  >
    <c-icon
      class="icon"
      :name="name"
    />
  </c-button>
</template>

<script setup lang="ts">
defineProps<{ name: string }>()
</script>

<style scoped>
.button {
  --icon-button-color: var(--color-opposite);
  --button-color-main: var(--icon-button-color);

  width: 40px;
  height: 40px;
  padding: 0;
  border-radius: 50%;

  filter: contrast(70%);
}

.button:hover {
  filter: contrast(100%);
}

.icon {
  display: block;
  width: 50%;
  height: 50%;
  margin: 0 auto;

  color: inherit;
}
</style>
