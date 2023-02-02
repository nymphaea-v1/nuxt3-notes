export interface Note {
  readonly id: number
  type: NoteType
  readonly creationTime: number
  deleteTime?: number
  isPinned: boolean
  content: NoteContent
}

export type NoteType = 'main' | 'archived' | 'deleted'

export interface NoteContent {
  color: string
  title: string
  text: string
}

export type NoteActionName = 'changeColor' | 'archive' | 'unarchive' | 'delete' | 'restore' | 'deleteForever'

export interface NoteAction {
  readonly actionName: NoteActionName
  readonly iconName: string
}
