<template>
  <c-note-creator
    class="note-creator"
    @new-note="addNote"
  />
  <c-note-list class="note-list" />
</template>

<script setup lang="ts">
import { Note } from '~~/store/notes'
const addNote = (note: Note) => {
  useNotes().add(note)
}
</script>

<style scoped>
.note-creator {
  margin: 10px auto;
}

.note-list {
  width: 800px;
  max-width: 90vw;
  margin: 0 auto;
}
</style>
