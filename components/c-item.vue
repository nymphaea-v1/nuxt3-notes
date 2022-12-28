<template>
  <div
    class="item"
    :style="{
      backgroundColor,
      backgroundImage,
      border
    }"
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
const schemeStore = useScheme()

const backgroundImage = computed(() => {
  const modifier = schemeStore.isDarkScheme ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)'

  return !isTransparent.value
    ? `linear-gradient(${props.backgroundColor}, ${props.backgroundColor}), linear-gradient(${modifier}, ${modifier})`
    : undefined
})

const backgroundColor = computed(() => {
  return isTransparent.value ? 'var(--color-background)' : undefined
})

const border = computed(() => {
  return isTransparent.value
    ? '1px var(--color-border) solid'
    : '1px transparent solid'
})
</script>

<style scoped>
.item {
  border-radius: var(--border-radius);

  background-blend-mode: color;
}
</style>
