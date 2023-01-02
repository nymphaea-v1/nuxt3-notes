import { ObjectDirective } from 'vue'

export const focusTrackLeave: ObjectDirective<HTMLElement> = {
  beforeMount (element) {
    element.addEventListener('focusout', ({ relatedTarget }) => {
      if (!element.contains(relatedTarget as Node | null)) {
        element.dispatchEvent(new Event('focusleave'))
      }
    })
  }
}
