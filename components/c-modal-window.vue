<template>
  <teleport to="body">
    <div
      v-track-exactclick
      class="modal-container"
      @exactclick="emitClose"
      @keydown.esc="emitClose"
    >
      <div class="modal-window">
        <slot />
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
const emits = defineEmits<{ (e: 'close'): void }>()
const emitClose = () => emits('close')
</script>

<style scoped>
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  background-color: rgb(0 0 0 / 50%);
}
</style>
