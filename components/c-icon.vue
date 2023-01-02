<template>
  <svg class="icon">
    <use :href="'#' + id" />
  </svg>
</template>

<script setup lang="ts">
import 'virtual:svg-icons-register'

interface Props {
  name: string
  preservedFill?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  preservedFill: false
})

const id = computed(() => `icon-${props.name}`)
const initialFill = ref<string | null>(null)

onMounted(() => {
  watchEffect(() => {
    if (!props.preservedFill) {
      initialFill.value = null
      return
    }

    initialFill.value = document.getElementById(id.value)?.firstElementChild?.getAttribute('fill') ?? null
  })
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

  color: v-bind(initialFill);
}
</style>
