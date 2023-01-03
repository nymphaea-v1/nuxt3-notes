import { ObjectDirective } from 'vue'

const onFocusout = (event: FocusEvent): void => {
  const currentTarget = event.currentTarget as HTMLElement
  const relatedTarget = event.relatedTarget as HTMLElement

  if (!currentTarget.contains(relatedTarget)) {
    currentTarget.dispatchEvent(new FocusEvent('focusleave', { relatedTarget }))
  }
}

export const trackFocusleave: ObjectDirective<HTMLElement> = {
  created (element) {
    element.addEventListener('focusout', onFocusout)
  },
  unmounted (element) {
    element.removeEventListener('focusout', onFocusout)
  }
}
