<template>
  <div class="color-selector">
    <client-only>
      <c-item
        v-for="(option, type) in colorOptions"
        :key="type"
        :ref="(instanse: any) => option.element = instanse?.$el"
        class="color-option"
        :background-color="unref(option.color)"
        @click="pickColor(type as string)"
      >
        <c-color-picker
          v-if="type === 'picker'"
          class="color-picker"
          :color="pickerColor"
          @update:color="emitColor"
        />
      </c-item>
    </client-only>
  </div>
</template>

<script setup lang="ts">
import { Ref } from 'vue'

const props = defineProps<{ color: string }>()
const emits = defineEmits<{ (e: 'update:color', color: string): void }>()

interface ColorOptions {
  [type: string] : {
    color: string | Ref<string>,
    element?: Element
  }
}

// computed?
const colorOptions: ColorOptions = {
  transparent: { color: 'transparent' }
}

const pickerColor = ref<string>('#000000')
colorOptions.picker = { color: pickerColor }

watch(() => props.color, (newValue) => {
  if (newValue !== 'transparent') pickerColor.value = newValue
}, { immediate: true })

const customColorsStore = useCustomColors()
customColorsStore.recentColors.forEach((color, index) => {
  colorOptions['recent-' + index] = { color }
})

onMounted(() => {
  const initialColor = props.color

  onUnmounted(() => {
    if (initialColor !== props.color && props.color !== 'transparent') {
      customColorsStore.add(props.color)
    }
  })
})

const picked = ref<string | null>(null)

const setPicked = (type: string) => {
  picked.value = type
}

watch(picked, () => {
  if (picked.value === null) return

  Object.keys(colorOptions).forEach(key => {
    if (key === picked.value) colorOptions[key].element?.classList.add('picked')
    else colorOptions[key].element?.classList.remove('picked')
  })
})

onMounted(() => {
  watch (() => props.color, () => {
    if (picked.value !== null && props.color === unref(colorOptions[picked.value].color)) return
    setPicked(props.color === 'transparent' ? 'transparent' : 'picker')
  }, { immediate: true })
})

const pickColor = (type: string) => {
  const color = colorOptions[type].color

  emitColor(unref(color))
  setPicked(type)
}

const emitColor = (color: string) => {
  emits('update:color', color)
}
</script>

<style scoped>
.color-selector {
  display: flex;
  gap: 6px;
  width: min-content;
  padding: 5px;
  border: 1px var(--color-border) solid;
  border-radius: 14px;

  background-color: var(--color-background);
}

.color-option {
  --item-color-border: transparent;

  width: 30px;
  height: 30px;
  border: 0;
  border-radius: 100%;
  overflow: hidden;
}

.color-option:first-child {
  border: 2px solid var(--color-border) !important;
}

.color-option:hover {
  border: 2px solid var(--color-opposite) !important;

  cursor: pointer;
  filter: brightness(110%);
}

.color-option.picked {
  border: 2px solid var(--color-brand) !important;
}

.color-picker {
  height: 100%;
}
</style>
