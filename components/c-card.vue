<template>
  <div
    class="item"
    :class="{ transparent: isTransparent }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  backgroundColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  backgroundColor: 'transparent'
})

const isTransparent = computed(() => props.backgroundColor === 'transparent')
</script>

<style scoped>
.item {
  border-radius: var(--border-radius);

  background-blend-mode: color;
}

.transparent {
  border: 1px var(--color-border) solid;

  background-color: var(--color-background);
}

:not(.transparent) {
  border: 1px transparent solid;

  background-image:
    linear-gradient(v-bind(backgroundColor), v-bind(backgroundColor)),
    linear-gradient(var(--color-modifier), var(--color-modifier));
}
</style>
