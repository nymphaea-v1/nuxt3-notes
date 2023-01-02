<template>
  <div
    class="note-editor"
    @keydown.ctrl.enter="emitClose"
    @keydown.meta.enter="emitClose"
  >
    <c-card :background-color="contentDraft.color">
      <div class="content">
        <div class="body">
          <c-textarea
            v-model:content="contentDraft.title"
            placeholder="Title"
            class="note-title"
          />
          <c-textarea
            v-model:content="contentDraft.text"
            v-focus
            placeholder="Take a note..."
            class="note-text"
          />
        </div>
        <div class="footer">
          <div class="left">
            <c-note-actions
              @delete="emitDelete"
              @color-select="openColorSelector"
            />
            <c-color-selector
              v-if="isOnColorSelect"
              v-model:color="contentDraft.color"
              v-focus-track-leave
              v-focus
              class="color-selector"
              @focusleave="closeColorSelector"
            />
          </div>
          <div class="right">
            <c-button
              class="close-button"
              type="borderless"
              @click="emitClose"
            >
              <span>Закрыть</span>
            </c-button>
          </div>
        </div>
      </div>
    </c-card>
  </div>
</template>

<script setup lang="ts">
import { NoteContent } from '~~/store/notes'

const props = defineProps<{ content?: NoteContent }>()
const emits = defineEmits<{
  (e: 'update:content', content: NoteContent): void
  (e: 'delete'): void
  (e: 'close'): void
}>()

const contentDraft = ref(props.content ? { ...props.content } : new NoteContent())

watch(contentDraft, (newValue) => {
  emitUpdateContent(newValue)
}, { deep: true })

const isOnColorSelect = ref(false)

const openColorSelector = () => {
  isOnColorSelect.value = true
}

const closeColorSelector = () => {
  isOnColorSelect.value = false
}

const emitUpdateContent = (content: NoteContent) => {
  emits('update:content', content)
}

const emitClose = () => {
  emits('close')
}

const emitDelete = () => {
  emits('delete')
}
</script>

<style scoped>
.note-editor {
  width: min-content;
}

.content {
  width: 600px;
  padding: 12px 16px 4px;
}

.body {
  max-height: 400px;
  margin-bottom: 10px;
  overflow: auto;
}

.note-title {
  margin-bottom: 8px;

  font-size: 1.1rem;
}

.footer {
  position: relative;

  display: flex;
  justify-content: space-between;
}

.color-selector {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
}

.close-button {
  height: 35px;

  --button-color-main: var(--color-text);
}

.close-button span {
  text-transform: none;
}
</style>
