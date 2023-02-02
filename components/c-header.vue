<template>
  <header class="header">
    <div class="left-side">
      <c-icon-button
        class="navbar-toggler"
        name="menu"
        @click="toggleNavbar"
      />
    </div>
    <div class="icons">
      <c-icon-button
        :name="schemeTogglerIconName"
        @click="scheme.toggleDark()"
      />
      <nuxt-link
        to="https://github.com/nymphaea-v1/nuxt3-notes"
        target="_blank"
      >
        <c-icon-button name="github" />
      </nuxt-link>
    </div>
  </header>
</template>

<script setup lang="ts">
const scheme = useScheme()
const schemeTogglerIconName = scheme.iconName

const isNavbarOpened = useState('isNavbarOpened')

const toggleNavbar = () => {
  isNavbarOpened.value = !isNavbarOpened.value
}
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 1;

  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 64px;
  padding: 5px 12px;
  border-bottom: 1px solid var(--color-border);

  background-color: var(--color-background);
}

@media screen and (max-width: 720px) {
  .navbar-toggler {
    display: none;
  }
}
</style>
