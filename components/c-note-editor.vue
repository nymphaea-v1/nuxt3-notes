<template>
  <c-card
    class="note-editor"
    :background-color="contentDraft.color"
    @keydown.ctrl.enter="emitClose"
    @keydown.meta.enter="emitClose"
  >
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

const openColorSelector = () => { isOnColorSelect.value = true }
const closeColorSelector = () => { isOnColorSelect.value = false }

const emitUpdateContent = (content: NoteContent) => emits('update:content', content)
const emitDelete = () => emits('delete')
const emitClose = () => emits('close')
</script>

<style scoped>
.note-editor {
  width: min-content;
}

.content {
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

.close-button {
  height: 35px;

  --button-color-main: var(--color-text);
}

.close-button span {
  text-transform: none;
}
</style>
