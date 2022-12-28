<template>
  <client-only>
    <c-icon-button
      :name="iconName"
      @click="toggleScheme"
    />
  </client-only>
</template>

<script setup lang="ts">
const schemeStore = useScheme()

const iconName = computed(() => schemeStore.isDarkScheme ? 'moon' : 'sun')
const toggleScheme = () => schemeStore.toggleScheme()
</script>
