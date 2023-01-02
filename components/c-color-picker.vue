<template>
  <label class="label">
    <input
      class="input"
      type="color"
      :value="pickedColor"
      @input="pickColor"
    >
    <slot />
  </label>
</template>

<script setup lang="ts">
const props = defineProps<{ color: string }>()
const emits = defineEmits<{ (e: 'update:color', color: string): void }>()

const hexRegexp = /^#[A-Fa-f0-9]{6}$/
const pickedColor = ref('#000000')

watch(() => props.color, (color) => {
  if (pickedColor.value === color) return
  pickedColor.value = hexRegexp.test(props.color) ? props.color : '#000000'
})

const pickColor = (event: Event) => {
  const color = (event.currentTarget as HTMLInputElement).value

  pickedColor.value = color
  emitColor(color)
}

const emitColor = (color: string) => emits('update:color', color)
</script>

<style scoped>
.label {
  position: relative;

  display: inline-block;

  cursor: pointer;
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
