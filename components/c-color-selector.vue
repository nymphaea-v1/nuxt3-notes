<template>
  <div class="color-selector">
    <client-only>
      <c-card
        v-for="(option, type) in colorOptions"
        :key="type"
        :ref="(instanse: any) => option.element = instanse?.$el"
        class="color-option"
        :class="{ picked: picked === type }"
        :background-color="unref(option.color)"
        @click="pickColor(type as string)"
      >
        <c-color-picker
          v-if="type === 'picker'"
          class="color-picker"
          :color="pickerColor"
          @update:color="emitColor"
        />
      </c-card>
    </client-only>
  </div>
</template>

<script setup lang="ts">
import { Ref, ComputedRef } from 'vue'

const props = defineProps<{ color: string }>()
const emits = defineEmits<{ (e: 'update:color', color: string): void }>()

const customColorsStore = useCustomColors()

onMounted(() => {
  const initialColor = props.color

  onUnmounted(() => {
    if (initialColor === props.color || props.color === 'transparent') return
    customColorsStore.add(props.color)
  })
})

const pickerColor: ComputedRef<string> = computed(() => {
  return props.color === 'transparent' ? pickerColor.value ?? customColorsStore.customColors[0] : props.color
})

interface ColorOptions {
  [type: string] : {
    color: string | Ref<string>,
    element?: Element
  }
}

const colorOptions: ColorOptions = {
  transparent: { color: 'transparent' },
  picker: { color: pickerColor }
}

customColorsStore.customColors.forEach((color, index) => {
  colorOptions['custom-' + index] = { color }
})

const picked = ref<string | null>(null)

onMounted(() => {
  watch (() => props.color, (color) => {
    if (picked.value !== null && color === unref(colorOptions[picked.value].color)) return
    picked.value = color === 'transparent' ? 'transparent' : 'picker'
  }, { immediate: true })
})

const pickColor = (type: string) => {
  picked.value = type
  emitColor(unref(colorOptions[type].color))
}

const emitColor = (color: string) => emits('update:color', color)
</script>

<style scoped>
.color-selector {
  display: flex;
  gap: 6px;
  width: min-content;
  padding: 5px;
  border: 1px solid var(--color-border);
  border-radius: 14px;

  background-color: var(--color-background);
}

.color-selector .color-option {
  --item-color-border: transparent;

  width: 30px;
  height: 30px;
  border: 2px solid transparent;
  border-radius: 100%;
  overflow: hidden;
}

.color-selector .color-option:first-child {
  border: 2px solid var(--color-border);
}

.color-selector .color-option:hover {
  border: 2px solid var(--color-opposite);

  cursor: pointer;
}

.color-selector .color-option.picked {
  border: 2px solid var(--color-brand);
}

.color-picker {
  width: 100%;
  height: 100%;
}
</style>
