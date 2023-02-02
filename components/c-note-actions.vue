<template>
  <div class="note-actions-wrapper">
    <div class="note-actions">
      <c-icon-button
        v-for="(action, index) in actions"
        :key="index"
        class="action"
        :name="action.iconName"
        @click="processAction(action.actionName)"
      />
    </div>
    <c-color-selector
      v-if="isOnColorSelect"
      v-track-focusleave
      v-focus
      class="color-selector"
      :color="color"
      @update:color="emitUpdateColor"
      @focusleave="closeColorSelector"
    />
  </div>
</template>

<script setup lang="ts">
import { NoteAction, NoteActionName, NoteType } from '~~/types/note'

const props = defineProps<{
  type: 'main' | 'archived' | 'deleted'
  color: string
}>()

const emits = defineEmits<{
  (e: 'action', action: NoteActionName): void
  (e: 'update:color', color: string): void
}>()

const typedActions: { readonly [key in NoteType]: NoteAction[] } = {
  main: [
    { actionName: 'changeColor', iconName: 'palette' },
    { actionName: 'archive', iconName: 'archive' },
    { actionName: 'delete', iconName: 'trashcan' }
  ],
  archived: [
    { actionName: 'changeColor', iconName: 'palette' },
    { actionName: 'unarchive', iconName: 'unarchive' },
    { actionName: 'delete', iconName: 'trashcan' }
  ],
  deleted: [
    { actionName: 'deleteForever', iconName: 'deleteForever' },
    { actionName: 'restore', iconName: 'restore' }
  ]
}

const actions = computed(() => typedActions[props.type])

const processAction = (action: NoteActionName) => {
  if (action === 'changeColor') openColorSelector()
  else emitAction(action)
}

const isOnColorSelect = ref(false)

const openColorSelector = () => {
  isOnColorSelect.value = true
}

const closeColorSelector = () => {
  emitAction('changeColor')
  isOnColorSelect.value = false
}

const emitAction = (action: NoteActionName) => emits('action', action)
const emitUpdateColor = (color: string) => emits('update:color', color)
</script>

<style scoped>
.note-actions-wrapper {
  position: relative;
}

.note-actions {
  display: flex;
  gap: 10px;
  padding: 2px;
}

.action {
  --icon-size: 34px;
}

.color-selector {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
}
</style>
