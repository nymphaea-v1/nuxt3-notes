export const useScheme = () => {
  const isDark = useDark({
    attribute: 'color-scheme',
    valueDark: 'dark',
    valueLight: 'light'
  })

  const iconName = computed(() => isDark.value ? 'moon' : 'sun')

  const toggleDark = useToggle(isDark)

  return { isDark, iconName, toggleDark }
}
