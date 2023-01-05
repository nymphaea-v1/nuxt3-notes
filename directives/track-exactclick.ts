import { ObjectDirective } from 'vue'

interface ExactclickData {
  isPressed: boolean
  onMousedown: (event: MouseEvent) => void
  onMouseup: (event: MouseEvent) => void
}

interface trackExactclickElement extends HTMLElement {
  _exactclickData?: ExactclickData
}

export const trackExactclick: ObjectDirective<trackExactclickElement> = {
  created (element) {
    if (element._exactclickData !== undefined) return

    const data = {
      isPressed: false,
      onMousedown: ({ target }: MouseEvent): void => {
        if (target === element) data.isPressed = true
      },
      onMouseup: ({ target }: MouseEvent): void => {
        if (data.isPressed && target === element) {
          element.dispatchEvent(new MouseEvent('exactclick'))
        }

        data.isPressed = false
      }
    }

    element._exactclickData = data
    element.addEventListener('mousedown', data.onMousedown)
    window.addEventListener('mouseup', data.onMouseup)
  },
  unmounted (element) {
    const data = element._exactclickData
    if (data === undefined) return

    delete element._exactclickData
    element.removeEventListener('mousedown', data.onMousedown)
    window.removeEventListener('mouseup', data.onMouseup)
  }
}
