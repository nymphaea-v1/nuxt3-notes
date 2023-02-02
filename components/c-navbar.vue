<template>
  <nav
    class="navbar"
    :class="{ opened: isNavbarOpened }"
  >
    <c-button
      v-for="({ text, iconName }, tab) in tabs"
      :key="tab"
      class="tab"
      :class="{ active: activeTab === tab }"
      @click="switchToTab(tab)"
    >
      <div class="content">
        <div class="icon-wrapper">
          <c-icon
            class="icon"
            :name="iconName"
          />
        </div>
        <span class="text">{{ text }}</span>
      </div>
    </c-button>
  </nav>
</template>

<script setup lang="ts">
const tabs = {
  home: { text: 'Notes', iconName: 'note' },
  archive: { text: 'Archive', iconName: 'archive' },
  trash: { text: 'Trash', iconName: 'trashcan' }
} as const

const isNavbarOpened = useState('isNavbarOpened', () => true)

const activeTab = computed(() => {
  const routeName = useRoute().name

  if (typeof routeName === 'string' && Object.keys(tabs).includes(routeName)) return routeName
  return null
})

const switchToTab = (tab: keyof typeof tabs) => {
  if (activeTab.value !== tab) return navigateTo(tab)
}
</script>

<style scoped>
.navbar {
  margin-top: 4px;
  margin-left: 12px;
}

.tab {
  position: relative;

  display: block;
  width: var(--tab-size);
  padding: 0;
  border-radius: 40px;

  --tab-size: 48px;
  --button-height: var(--tab-size);
  transition: width 0.12s ease;
}

.tab.active {
  background-color: var(--color-brand-themed);
}

.content {
  display: flex;
  gap: 24px;
  height: 100%;
}

.icon-wrapper {
  width: var(--tab-size);
}

.icon {
  display: block;
  width: 24px;
  height: 100%;
  margin: 0 auto;
}

.text {
  display: none;
  flex-grow: 1;
  overflow: hidden;

  text-overflow: ellipsis;
}

@media screen and (min-width: 720px) {
  .navbar.opened .tab {
    left: -40px;

    width: 280px;
    padding-left: 40px;
  }

  .navbar.opened .text {
    display: initial;
  }
}
</style>
