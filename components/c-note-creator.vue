<template>
  <div class="note-creator">
    <c-note-editor
      v-if="isEditorOpen"
      v-model:content="content"
      v-track-focusleave
      @focusleave="completeNoteEdit"
      @delete="closeEditor"
      @close="completeNoteEdit"
      @keydown.esc="completeNoteEdit"
    />
    <div
      v-else
      class="preview"
      @focusin="openEditor"
    >
      <c-textarea placeholder="Take a note..." />
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
