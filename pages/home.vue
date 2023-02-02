<template>
  <c-note-creator class="note-creator" />
  <c-note-list
    class="note-list"
    :notes="notesList"
  />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'

const { mainNotes: notes } = storeToRefs(useNotes())

const notesList = computed(() => {
  return Array.from(notes.value.values())
})
</script>
