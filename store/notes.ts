import { Note, NoteContent } from '~~/types/note'

const startingNotes: Note[] = [
  { id: 0, type: 'main', creationTime: 0, isPinned: false, content: { color: 'transparent', title: 'About this project', text: 'This site is based on Google Keep app and was written from scratch by @nymphaea-v1\n\nWanna see the source code? Find the link to Github repository at the top-left corner.' } },
  { id: 1, type: 'main', creationTime: 0, isPinned: false, content: { color: '#57fff4', title: 'Take your first note!', text: 'To make a note, click on "Take a note..." field and start typing. ' } }
]

export const useNotes = defineStore('notes', () => {
  const mainNotes = useLocalStorage<Map<Number, Note>>('mainNotes', new Map())
  const archivedNotes = useLocalStorage<Map<Number, Note>>('archivedNotes', new Map())
  const deletedNotes = useLocalStorage<Map<Number, Note>>('deletedNotes', new Map())

  if (mainNotes.value.size === 0 && archivedNotes.value.size === 0 && deletedNotes.value.size === 0) {
    startingNotes.forEach(note => mainNotes.value.set(note.id, note))
  }

  const create = (content?: NoteContent): Note => {
    const note = generateNote(content)

    mainNotes.value.set(note.id, note)
    return note
  }

  const deleteForever = (id: number): boolean => {
    return deletedNotes.value.delete(id)
  }

  const pin = (id: number): boolean => {
    const note = getById(id)
    if (note === undefined || note.type === 'deleted' || note.isPinned) return false

    note.isPinned = true

    return true
  }

  const unpin = (id: number): boolean => {
    const note = getById(id)
    if (note === undefined || note.type === 'deleted' || !note.isPinned) return false

    note.isPinned = false

    return true
  }

  const archive = (id: number): boolean => {
    const note = getById(id)
    if (note === undefined || note.type !== 'main') return false

    note.type = 'archived'
    mainNotes.value.delete(id)
    archivedNotes.value.set(id, note)

    return true
  }

  const unarchive = (id: number): boolean => {
    const note = getById(id)
    if (note === undefined || note.type !== 'archived') return false

    note.type = 'main'
    archivedNotes.value.delete(id)
    mainNotes.value.set(id, note)

    return true
  }

  const remove = (id: number): boolean => {
    const note = getById(id)
    if (note === undefined || note.type === 'deleted') return false

    note.type = 'deleted'
    note.deleteTime = Date.now()
    if (!mainNotes.value.delete(id)) archivedNotes.value.delete(id)
    deletedNotes.value.set(id, note)

    return true
  }

  const restore = (id: number): boolean => {
    const note = getById(id)
    if (note === undefined || note.type !== 'deleted') return false

    note.type = 'main'
    deletedNotes.value.delete(id)
    mainNotes.value.set(id, note)
    note.deleteTime = undefined

    return true
  }

  const changeColor = (id: number, color: string): boolean => {
    const note = getById(id)
    if (note === undefined || note.type === 'deleted') return false

    note.content.color = color

    return true
  }

  const editContent = (id: number, content: Partial<NoteContent>): boolean => {
    const note = getById(id)
    if (note === undefined || note.type === 'deleted') return false

    note.content = { ...note.content, ...content }

    return true
  }

  const getInitialContent = (): NoteContent => {
    return { color: 'transparent', title: '', text: '' }
  }

  const getById = (id: number): Note | undefined => {
    return mainNotes.value.get(id) ?? archivedNotes.value.get(id) ?? deletedNotes.value.get(id)
  }

  return { mainNotes, archivedNotes, deletedNotes, create, deleteForever, pin, unpin, archive, unarchive, delete: remove, restore, changeColor, editContent, getInitialContent, getById }
})

const generateNote = (content?: NoteContent): Note => {
  return {
    id: generateId(),
    type: 'main',
    creationTime: Date.now(),
    isPinned: false,
    content: content ?? { color: 'transparent', title: '', text: '' }
  }
}

const generateId = (): number => {
  return Math.floor(Math.random() * 1000000)
}
