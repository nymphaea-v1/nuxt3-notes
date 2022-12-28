import { ObjectDirective } from 'vue'

export const focusout: ObjectDirective<HTMLElement, Function> = {
  beforeMount (element, { value: onFocusout }) {
    if (typeof onFocusout !== 'function') return

    element.addEventListener('focusout', ({ relatedTarget }) => {
      if (!element.contains(relatedTarget as Node | null)) {
        onFocusout()
      }
    })
  },
  mounted (element, { modifiers: { focus } }) {
    if (!focus) return

    if (!element.hasAttribute('tabindex')) element.setAttribute('tabindex', '-1')
    element.focus({ preventScroll: true })
  }
}
