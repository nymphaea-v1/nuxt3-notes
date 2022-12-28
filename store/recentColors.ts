const defaultColors = ['#ff0000', '#ff00ff', '#0000ff', '#00ffff', '#00ff00', '#ffff00']

export const useCustomColors = defineStore('customColors', () => {
  const customColors = useLocalStorage<string[]>('customColors', [])

  if (customColors.value.length === 0) customColors.value = [...defaultColors]

  const add = (color: string): void => {
    customColors.value = customColors.value.filter(c => c !== color)
    customColors.value.unshift(color)
    while (customColors.value.length > 5) customColors.value.pop()
  }

  return { recentColors: skipHydrate(customColors), add }
})
