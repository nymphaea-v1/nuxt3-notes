<template>
  <div class="note-actions">
    <c-icon-button
      class="button"
      name="palette"
      @click="emitColorSelect"
    />
    <c-icon-button
      class="button"
      name="trashcan"
      @click="emitDelete"
    />
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits<{
  (e: 'colorSelect'): void
  (e: 'delete'): void
}>()

const emitColorSelect = () => emits('colorSelect')
const emitDelete = () => emits('delete')
</script>

<style scoped>
.note-actions {
  position: relative;

  display: flex;
  gap: 10px;
}

.button {
  --icon-button-color: var(--color-text);
  width: 35px;
  height: 35px;
}
</style>
