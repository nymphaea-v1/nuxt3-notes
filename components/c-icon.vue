<template>
  <svg class="icon">
    <use :href="'#' + id" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  prefix?: string
  name: string
}

const props = withDefaults(defineProps<Props>(), {
  prefix: 'icon'
})

const id = computed(() => `${props.prefix}-${props.name}`)

const initialColor = ref<string | null>(null)

onMounted(() => {
  initialColor.value = document.getElementById(id.value)?.firstElementChild?.getAttribute('fill') || null
})
</script>

<style>
#svg-sprite symbol path {
  fill: currentcolor;
}
</style>

<style scoped>
.icon {
  width: 2em;
  height: 2em;
  aspect-ratio: 1;

  color: v-bind(initialColor);
}
</style>
