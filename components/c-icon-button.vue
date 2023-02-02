<template>
  <c-button class="button">
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
  --icon-size: 48px;
  --button-height: var(--icon-size);

  padding: 0;
  border-radius: 50%;
}

.icon {
  display: block;
  width: 50%;
  height: 100%;
  margin: 0 auto;
}
</style>
