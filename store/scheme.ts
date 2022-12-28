export const useScheme = defineStore('scheme', () => {
  const isDarkScheme = useDark({
    attribute: 'color-scheme',
    valueDark: 'dark',
    valueLight: 'light'
  })

  const toggleScheme = useToggle(isDarkScheme)
  return { isDarkScheme: skipHydrate(isDarkScheme), toggleScheme }
})
