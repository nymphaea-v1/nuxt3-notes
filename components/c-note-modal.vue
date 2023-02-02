<template>
  <c-modal
    v-if="content !== undefined"
    @close="close"
  >
    <c-note-editor
      v-model:content="content"
      :type="note!.type"
      class="note-editor"
      @action="processAction"
      @done="close"
    />
  </c-modal>
</template>

<script setup lang="ts">
import { NoteContent } from '~~/types/note'
import { EditorNoteActionName } from './c-note-editor.vue'

const notesStore = useNotes()
const openedNote = useOpenedNote()

const note = openedNote.value
const content = ref<NoteContent | undefined>(note.value?.content)

watch(note, () => {
  content.value = note.value?.content
})

const processAction = (action: EditorNoteActionName) => {
  const actionToCloseAfter = ['archive', 'unarchive', 'delete', 'restore', 'deleteForever']

  if (action in notesStore && note.value !== null) notesStore[action](note.value.id)
  if (actionToCloseAfter.includes(action)) close()
}

const close = () => {
  if (note.value !== null && content.value !== undefined) {
    notesStore.editContent(note.value.id, content.value)
  }

  openedNote.close()
}

onMounted(() => {
  // ask before leave if user has unsaved changes
  window.onbeforeunload = () => {
    if (content.value !== undefined) return ''
  }
})
</script>

<style scoped>
.note-editor {
  max-width: 90vw;
}
</style>
