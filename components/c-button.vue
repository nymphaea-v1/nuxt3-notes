<template>
  <button
    class="reset-button button"
    :class="type"
  >
    <div class="button-content">
      <slot>
        button
      </slot>
    </div>
    <div class="button-background" />
  </button>
</template>

<script setup lang="ts">
interface Props {
  type?: 'contained' | 'outlined' | 'borderless'
}

withDefaults(defineProps<Props>(), {
  type: 'contained'
})
</script>

<style scoped>
.reset-button {
  border: none;

  background: none;
}

.reset-button:focus-visible {
  outline: none;
}

.button {
  position: relative;

  width: min-content;
  height: 40px;
  padding: 0 20px;
  overflow: hidden;

  --button-color-main: var(--color-brand);
  --button-color-second: rgb(255 255 255);
}

.button:hover {
  cursor: pointer;
}

.button-content {
  overflow: hidden;

  font-weight: bold;
  letter-spacing: 0.05rem;
  white-space: nowrap;
  text-transform: uppercase;
  text-overflow: ellipsis;
}

.button-background {
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
}

.contained {
  border: 1px var(--button-color-main) solid;
  border-radius: 4px;

  color: var(--button-color-second);

  background-color: var(--button-color-main);

  transition: all 0.2s;
}

.contained:hover {
  filter: brightness(110%);
}

.contained:active {
  filter: brightness(90%);
}

.outlined {
  border: 1px var(--button-color-main) solid;
  border-radius: 4px;

  color: var(--button-color-main);
}

.outlined .button-background {
  background-color: var(--button-color-main);
  opacity: 0;

  transition: all 0.2s;
}

.outlined:hover .button-background {
  opacity: 0.15;
}

.outlined:active .button-background {
  opacity: 0.25;
  filter: brightness(90%);
}

.borderless {
  border-radius: 4px;

  color: var(--button-color-main);
}

/* stylelint-disable-next-line no-descending-specificity */
.borderless .button-background {
  background-color: var(--button-color-main);
  opacity: 0;

  transition: all 0.2s;
}

.borderless:hover .button-background {
  background-color: var(--button-color-main);
  opacity: 0.15;
}

.borderless:active .button-background {
  background-color: var(--button-color-main);
  opacity: 0.25;
}
</style>
