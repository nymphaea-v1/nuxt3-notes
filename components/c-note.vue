<template>
  <c-item
    class="note"
    :background-color="note.content.color"
  >
    <div class="content">
      <div
        class="body"
        @click="emitNoteEdit"
      >
        <c-paragraph
          :lines="2"
          class="note-title"
        >
          {{ note.content.title }}
        </c-paragraph>
        <c-paragraph
          :lines="10"
          class="note-text"
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
        class="footer"
        @color-select="emitColorSelect"
        @delete="emitDelete"
      />
    </div>
  </c-item>
</template>

<script setup lang="ts">
import { Note } from '~~/store/notes'

defineProps<{ note: Note }>()

const emits = defineEmits<{
  (e: 'colorSelect'): void
  (e: 'noteEdit'): void
  (e: 'delete'): void
}>()

const emitColorSelect = () => {
  emits('colorSelect')
}

const emitNoteEdit = () => {
  emits('noteEdit')
}

const emitDelete = () => {
  emits('delete')
}
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
  justify-content: space-evenly;

  opacity: 0;

  transition: opacity 0.4s;
}

.footer:focus-within,
.content:hover > .footer {
  opacity: 1;
}
</style>
