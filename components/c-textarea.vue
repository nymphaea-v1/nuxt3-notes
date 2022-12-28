<template>
  <textarea
    ref="elementRef"
    class="textarea"
    :value="content"
    @input="onInput"
  />
</template>

<script setup lang="ts">
defineProps<{ content?: string }>()
const emits = defineEmits<{ (e: 'update:content', content: string): void }>()

const elementRef = ref<HTMLInputElement | null>(null)
let element: HTMLInputElement

onMounted(() => {
  element = elementRef.value as HTMLInputElement
  autoResize(element)
})

const onInput = () => {
  emitUpdate(element.value)
  autoResize(element)
}

const autoResize = (element: HTMLElement) => {
  element.style.height = '19px'
  element.style.height = element.scrollHeight + 1 + 'px'
}

const emitUpdate = (content: string) => {
  emits('update:content', content)
}
</script>

<style scoped>
.textarea {
  width: 100%;
  border: 0;

  color: inherit;
  font: inherit;

  background: 0;

  resize: none;
}

.textarea:focus-visible {
  outline: 0;
}

.textarea::placeholder {
  color: inherit;

  opacity: 0.7;
}

</style>
