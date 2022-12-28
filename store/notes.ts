export class NoteContent {
  color: string = 'transparent'
  title: string = ''
  text: string = ''
}

export class Note {
  readonly id: number
  readonly creationTime: number
  content: NoteContent

  constructor (content?: NoteContent) {
    this.id = generateId()
    this.creationTime = Date.now()
    this.content = content ?? new NoteContent()
  }
}

export const useNotes = defineStore('notes', () => {
  const notes = useLocalStorage<Note[]>('notes', [])

  const add = (note: Note): void => {
    notes.value.push(note)
  }

  const remove = (id: number): boolean => {
    const length = notes.value.length

    notes.value = notes.value.filter(n => n.id !== id)
    return length !== notes.value.length
  }

  const getById = (id: number): Note | undefined => {
    return notes.value.find(note => note.id === id)
  }

  return { notes: skipHydrate(notes), add, remove, getById }
})

const generateId = (): number => {
  return Math.floor(Math.random() * 1000000)
}
