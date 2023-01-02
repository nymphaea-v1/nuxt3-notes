import { ObjectDirective } from 'vue'

export const focus: ObjectDirective<HTMLElement> = {
  mounted (element) {
    if (!element.hasAttribute('tabindex')) element.setAttribute('tabindex', '-1')
    element.focus({ preventScroll: true })
  }
}
