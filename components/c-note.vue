<template>
  <c-card
    class="note"
    :background-color="color"
  >
    <div class="content">
      <div
        class="body"
        @click="openNote(note)"
      >
        <c-paragraph
          class="note-title"
          :lines="2"
        >
          {{ note.content.title }}
        </c-paragraph>
        <c-paragraph
          class="note-text"
          :lines="10"
        >
          {{ note.content.text }}
        </c-paragraph>
        <c-paragraph
          v-if="(!note.content.title && !note.content.text)"
          class="note-empty"
        >
          Empty note
        </c-paragraph>
      </div>
      <c-note-actions
        v-model:color="color"
        class="footer"
        :type="note.type"
        @action="processAction"
      />
    </div>
  </c-card>
</template>

<script setup lang="ts">
import { Note, NoteActionName } from '~~/types/note'

const props = defineProps<{ note: Note }>()

const notesStore = useNotes()
const color = ref(props.note.content.color)

watch(() => props.note.content.color, (newValue) => {
  if (color.value !== newValue) color.value = newValue
})

const processAction = (action: NoteActionName) => {
  if (!(action in notesStore)) return

  if (action === 'changeColor') notesStore.changeColor(props.note.id, color.value)
  else (notesStore[action](props.note.id))
}

const openNote = useOpenedNote().open
</script>

<style scoped>
.note {
  width: 230px;
}

.content {
  display: flex;
  flex-direction: column;
}

.body {
  flex-grow: 1;
  padding: 10px 14px;
  overflow: hidden;

  white-space: pre-wrap;
  word-break: break-word;

  user-select: none;
}

.note-title {
  margin-bottom: 4px;

  font-size: 1.2rem;
}

.note-text {
  font-size: 0.9rem;
}

.note-empty {
  font-size: 1.4rem;

  opacity: 0.7;
}

.footer {
  position: relative;

  opacity: 0;

  transition: opacity 0.4s;
}

.footer:focus-within,
.content:hover > .footer {
  opacity: 1;
}
</style>
