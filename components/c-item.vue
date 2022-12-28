<template>
  <div class="item">
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

const schemeStore = useScheme()

const background = computed(() => {
  if (props.backgroundColor === 'transparent') return null

  const modifier = schemeStore.isDarkScheme ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)'

  return `linear-gradient(${props.backgroundColor}, ${props.backgroundColor}), linear-gradient(${modifier}, ${modifier})`
})

const border = computed(() => {
  const borderColor = props.backgroundColor === 'transparent' ? 'var(--color-border)' : 'transparent'

  return `1px ${borderColor} solid`
})
</script>

<style scoped>
.item {
  border: v-bind(border);
  border-radius: var(--border-radius);

  background-image: v-bind(background);
  background-blend-mode: color;
}
</style>
