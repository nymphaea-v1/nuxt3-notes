import { ObjectDirective } from 'vue'

const onFocusout = (event: FocusEvent): void => {
  const currentTarget = event.currentTarget as HTMLElement
  const relatedTarget = event.relatedTarget as HTMLElement

  if (!currentTarget.contains(relatedTarget)) {
    currentTarget.dispatchEvent(new Event('focusleave'))
  }
}

export const focusTrackLeave: ObjectDirective<HTMLElement> = {
  created (element) {
    element.addEventListener('focusout', onFocusout)
  },
  unmounted (element) {
    element.removeEventListener('focusout', onFocusout)
  }
}
