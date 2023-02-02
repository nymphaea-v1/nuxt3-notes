<template>
  <div class="note-creator">
    <c-note-editor
      v-if="content !== null"
      v-model:content="content"
      v-track-focusleave
      class="note-editor"
      type="main"
      @action="processAction"
      @done="create"
      @focusleave="create"
      @keydown.esc="create"
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
import { NoteContent } from '~~/types/note'
import { EditorNoteActionName } from './c-note-editor.vue'

const notesStore = useNotes()
const content = ref<NoteContent | null>(null)

const create = () => {
  let id = null

  if (content.value !== null && (content.value.title !== '' || content.value.text !== '')) {
    id = notesStore.create(content.value).id
  }

  closeEditor()
  return id
}

const processAction = (action: EditorNoteActionName) => {
  if (action === 'archive') {
    const id = create()
    if (id !== null) notesStore.archive(id)
  } else if (action === 'delete') closeEditor()
}

const openEditor = () => {
  content.value = notesStore.getInitialContent()
}

const closeEditor = () => {
  content.value = null
}
</script>

<style scoped>
.note-creator {
  width: 90%;
  max-width: 600px;
  margin: 10px auto;
}

.note-editor {
  width: 100%;
}

.preview {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  border: 1px var(--color-border) solid;
  border-radius: var(--border-radius);
}
</style>
