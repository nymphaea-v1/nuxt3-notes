import { Note } from '~~/types/note'

export const useOpenedNote = () => {
  const openedNote = useState<Note | null>('openedNote', () => {
    const idString = useRoute().query.id
    if (idString === null || idString === undefined || idString === '') return null

    const id = +idString
    return Number.isNaN(id) ? null : useNotes().getById(id) ?? null
  })

  watch(openedNote, (newValue) => {
    const id = newValue === null ? undefined : newValue.id
    void navigateTo({ query: { ...useRoute().query, id } }, { replace: true })
  }, { immediate: true })

  const open = (note: Note): void => {
    useState('openedNote').value = note
  }

  const close = (): void => {
    useState('openedNote').value = null
  }

  return { value: openedNote, open, close }
}
