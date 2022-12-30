<template>
  <div
    class="note-list"
    @mousedown="updateLastClickCoords"
  >
    <div v-masonry="notes">
      <client-only>
        <div
          v-for="note in notes"
          :key="note.id"
          class="note-item"
        >
          <c-note
            :note="note"
            @color-select="selectColor(note)"
            @note-edit="editNote(note)"
            @delete="deleteNote(note.id)"
          />
        </div>
      </client-only>
    </div>
    <c-color-selector
      v-if="isOnColorSelect"
      ref="colorSelectorElement"
      v-model:color="noteOnColorSelect!.content.color"
      v-focusout.focus="selectColorDone"
      class="color-selector"
    />
    <c-modal-window
      v-if="isOnNoteEdit"
      @close="editNoteDone"
    >
      <c-note-editor
        v-model:content="noteOnEditContent"
        @delete="deleteNoteOnEdit"
        @close="editNoteDone"
      />
    </c-modal-window>
  </div>
</template>

<script setup lang="ts">
import { ComponentPublicInstance } from 'vue'
import { Note, NoteContent } from '~~/store/notes'

const notesStore = useNotes()
const notes = ref<Note[]>([])

watch(() => notesStore.notes.length, () => {
  notes.value = [...notesStore.notes]
  notes.value.reverse()
}, { immediate: true })

const isOnColorSelect = ref(false)
const noteOnColorSelect = ref<Note | null>(null)

const selectColor = (note: Note) => {
  noteOnColorSelect.value = note
  isOnColorSelect.value = true
}

const selectColorDone = () => {
  noteOnColorSelect.value = null
  isOnColorSelect.value = false
}

const colorSelectorElement = ref<ComponentPublicInstance | null>(null)
const lastClickCoords = ref({ x: 0, y: 0 })

watch(colorSelectorElement, (newValue) => {
  if (newValue === null) return

  newValue.$el.style.top = lastClickCoords.value.y + 'px'
  newValue.$el.style.left = lastClickCoords.value.x + 'px'
})

const updateLastClickCoords = (event: MouseEvent) => {
  lastClickCoords.value = getMouseCoords(event)
}

const isOnNoteEdit = ref(false)
const noteOnEdit = ref<Note | null>(null)
const noteOnEditContent = ref<NoteContent | undefined>(undefined)

const editNote = (note: Note) => {
  noteOnEdit.value = note
  noteOnEditContent.value = note.content
  isOnNoteEdit.value = true
}

const editNoteDone = () => {
  if (noteOnEdit.value === null || noteOnEditContent.value === undefined) return

  noteOnEdit.value.content = noteOnEditContent.value
  resetEditInfo()
}

const deleteNoteOnEdit = () => {
  if (noteOnEdit.value !== null) deleteNote(noteOnEdit.value.id)
  resetEditInfo()
}

const resetEditInfo = () => {
  noteOnEdit.value = null
  noteOnEditContent.value = undefined
  isOnNoteEdit.value = false
}

const deleteNote = (id: number) => {
  notesStore.remove(id)
}
</script>

<style scoped>
.note-list {
  position: relative;

  width: 800px;
}

.note-item {
  position: absolute;
}

.color-selector {
  position: absolute;
  z-index: 1;
}
</style>
