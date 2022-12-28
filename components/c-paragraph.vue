https://css-tricks.com/almanac/properties/l/line-clamp/
<template>
  <p class="paragraph">
    <slot />
  </p>
</template>

<script setup lang="ts">
defineProps<{ lines?: number }>()
</script>

<style scoped>
.paragraph {
  display: -webkit-box;
  -webkit-line-clamp: v-bind(lines);
  -webkit-box-orient: vertical;

  overflow: hidden;
}
</style>
