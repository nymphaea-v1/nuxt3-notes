<template>
  <button class="reset button">
    <slot />
    <div class="background" />
  </button>
</template>

<style scoped>
.button {
  --button-height: 35px;
  position: relative;

  display: inline-block;
  height: var(--button-height);
  padding: 0 20px;
  border-radius: 4px;

  line-height: var(--button-height);
}

.reset {
  border: none;

  color: var(--color-text);
  font-weight: inherit;
  font-size: inherit;
  font-family: inherit;
  text-align: inherit;

  background: none;
}

.background {
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  border-radius: inherit;

  background-color: var(--color-opposite);
  opacity: 0;

  pointer-events: none;
}

.button:hover {
  color: var(--color-opposite);
}

.button:hover .background {
  opacity: 0.1;
}

.button:active .background {
  opacity: 0.15;
}
</style>
