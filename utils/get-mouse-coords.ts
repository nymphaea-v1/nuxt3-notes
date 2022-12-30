export interface Coordinates {
  x: number
  y: number
}

export const getMouseCoords = (event: MouseEvent, element?: HTMLElement): Coordinates => {
  const targetCoords = (element ?? event.currentTarget as HTMLElement).getBoundingClientRect()
  console.log(1)
  const offsetX = targetCoords.x
  const offsetY = targetCoords.y

  const coords: Coordinates = {
    x: event.clientX - offsetX,
    y: event.clientY - offsetY
  }

  return coords
}
