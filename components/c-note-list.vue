<template>
  <div
    ref="noteListElement"
    class="note-list"
  >
    <div
      v-masonry="reversedNotes"
      class="masonry"
    >
      <c-note
        v-for="note in reversedNotes"
        :key="note.id"
        class="note"
        :class="{ wide: isWideNote }"
        :note="note"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Note } from '~~/types/note'

const props = defineProps<{ notes: Note[] }>()

const getReversedNotes = (notes: Note[]) => [...notes].reverse()
const reversedNotes = ref(getReversedNotes(props.notes))

watch(() => props.notes, () => {
  reversedNotes.value = getReversedNotes(props.notes)
}, { deep: true })

const noteListElement = ref<HTMLElement | null>(null)
const isWideNote = ref(false)

onMounted(() => {
  if (noteListElement.value === null) return

  new ResizeObserver(() => {
    if (noteListElement.value !== null && noteListElement.value.clientWidth <= 470) {
      isWideNote.value = true
    } else isWideNote.value = false
  }).observe(noteListElement.value)
})
</script>

<style scoped>
.note-list {
  width: 90%;
  max-width: 800px;
  margin: 10px auto;
}

.masonry {
  position: relative;
}

.note {
  position: absolute;
}

.note.wide {
  width: 100%;
}
</style>
