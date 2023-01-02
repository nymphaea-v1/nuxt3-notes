<template>
  <div class="note-creator">
    <div
      v-if="!isEditorOpen"
      class="preview"
      @focusin="openEditor"
    >
      <c-textarea placeholder="Take a note..." />
    </div>
    <div
      v-if="isEditorOpen"
      v-focus-track-leave
      @focusleave="completeNoteEdit"
    >
      <c-note-editor
        v-model:content="content"
        @delete="closeEditor"
        @close="completeNoteEdit"
        @keydown.esc="completeNoteEdit"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { NoteContent, Note } from '~~/store/notes'

const emits = defineEmits<{ (e: 'newNote', note: Note): void }>()

const content = ref<NoteContent>(new NoteContent())
const isEditorOpen = ref(false)

const openEditor = () => {
  isEditorOpen.value = true
}

const closeEditor = () => {
  content.value = new NoteContent()
  isEditorOpen.value = false
}

const completeNoteEdit = () => {
  emitNewNote(content.value)
  closeEditor()
}

const emitNewNote = (content: NoteContent) => {
  if (content.title !== '' || content.text !== '') {
    emits('newNote', new Note(content))
  }
}
</script>

<style scoped>
.note-creator {
  width: 600px;
}

.preview {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  border: 1px var(--color-border) solid;
  border-radius: var(--border-radius);
}
</style>
