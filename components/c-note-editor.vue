<template>
  <c-card
    class="note-editor"
    :background-color="contentDraft.color"
    @keydown.ctrl.enter="emitDone"
    @keydown.meta.enter="emitDone"
  >
    <div class="content">
      <div class="body">
        <c-textarea
          v-model:content="contentDraft.title"
          class="note-title"
          placeholder="Title"
          :disabled="type === 'deleted'"
        />
        <c-textarea
          v-model:content="contentDraft.text"
          v-focus
          class="note-text"
          placeholder="Take a note..."
          :disabled="type === 'deleted'"
        />
      </div>
      <div class="footer">
        <c-note-actions
          v-model:color="contentDraft.color"
          :type="type"
          @action="processAction"
        />
        <div class="buttons">
          <c-button @click="emitDone">
            Done
          </c-button>
        </div>
      </div>
    </div>
  </c-card>
</template>

<script setup lang="ts">
import { NoteContent, NoteType, NoteActionName } from '~~/types/note'

export type EditorNoteActionName = Exclude<NoteActionName, 'changeColor'>

const props = defineProps<{
  content: NoteContent
  type: NoteType
}>()

const emits = defineEmits<{
  (e: 'update:content', content: NoteContent): void
  (e: 'action', action: EditorNoteActionName): void
  (e: 'done'): void
}>()

const contentDraft = ref({ ...props.content })

watch(contentDraft, () => {
  emitUpdateContent(contentDraft.value)
}, { deep: true })

const processAction = (action: NoteActionName) => {
  if (action !== 'changeColor') emitAction(action)
}

const emitUpdateContent = (content: NoteContent) => emits('update:content', content)
const emitAction = (action: EditorNoteActionName) => emits('action', action)
const emitDone = () => emits('done')
</script>

<style scoped>
.note-editor {
  width: 600px;
}

.body {
  max-height: 400px;
  overflow: auto;
}

.note-title {
  padding: 16px 14px 0;

  font-size: 1.1rem;
}

.note-text {
  padding: 12px 14px;
}

.footer {
  position: relative;

  display: flex;
  justify-content: space-between;
  padding: 4px;
}

.color-selector {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
}
</style>
