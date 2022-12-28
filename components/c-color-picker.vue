<template>
  <div class="color-picker">
    <label
      class="label"
      :for="id"
    />
    <input
      :id="id"
      class="input"
      type="color"
      :value="pickerColor"
      @input="emitColor"
    >
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ color: string }>()
const emits = defineEmits<{ (e: 'update:color', color: string): void }>()

const pickerColor = computed(() => {
  const hexRegexp = /^#[A-Fa-f0-9]{6}$/
  return hexRegexp.test(props.color) ? props.color : '#000000'
})
const id = useRandom(10) + ''

const emitColor = (event: Event) => {
  emits('update:color', (event.currentTarget as HTMLInputElement).value)
}
</script>

<style scoped>
.color-picker {
  position: relative;
}

.label {
  position: absolute;

  display: block;
  width: 100%;
  height: 100%;

  cursor: inherit;
}

.input {
  position: absolute;
  bottom: -3px;

  width: 0;
  height: 0;
  border: none;

  appearance: none;
}

.input::-webkit-color-swatch-wrapper {
  padding: 0;
}

.input::-webkit-color-swatch {
  border: none;
}
</style>
