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

const defaultNotes = [
  { id: 0, creationTime: 0, content: { color: 'transparent', title: 'About this project', text: 'This site is a minimal copy of Google Keep with small adjustments.\n\nYou can find the source code in github @nymphaea-v1' } },
  { id: 1, creationTime: 0, content: { color: '#57fff4', title: 'Take your first note!', text: 'To make a note, click on "Take a note..." field and start typing. ' } }
]

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

  if (process.client && notes.value.length === 0) {
    notes.value = [...defaultNotes]
  }

  return { notes: skipHydrate(notes), add, remove, getById }
})

const generateId = (): number => {
  return Math.floor(Math.random() * 1000000)
}
