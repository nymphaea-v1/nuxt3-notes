import { ObjectDirective, WatchSource } from 'vue'

let resizeObserver: ResizeObserver
if (process.client) {
  resizeObserver = new ResizeObserver((entries) => {
    entries.forEach(({ target }) => setMasonryGrid(target as HTMLElement))
  })
}

const setMasonryGrid = (container: HTMLElement): void => {
  const items = container.children
  if (items.length === 0) return

  const gap = 10
  const containerWidth = container.clientWidth
  const itemWidth = (items[0] as HTMLElement).offsetWidth
  const columnNumber = Math.floor((gap + containerWidth) / (itemWidth + gap))
  const marginX = (containerWidth - columnNumber * (itemWidth + gap) + gap) / 2
  const columnCoordsX = Array<number>(columnNumber).fill(0).map((_, i) => marginX + (itemWidth + gap) * i)
  const columnCoordsY = Array<number>(columnNumber).fill(0)

  for (const item of items) {
    const HTMLItem = item as HTMLElement
    const columnIndex = columnCoordsY.reduce((a, n, i) => columnCoordsY[a] <= n ? a : i, 0) // find lowest index

    HTMLItem.style.top = `${columnCoordsY[columnIndex]}px`
    HTMLItem.style.left = `${columnCoordsX[columnIndex]}px`

    columnCoordsY[columnIndex] += item.clientHeight + gap
  }

  container.style.height = `${Math.max(...columnCoordsY) - gap}px`
}

export const masonry: ObjectDirective<HTMLElement, WatchSource> = {
  mounted (element) {
    setMasonryGrid(element)
    resizeObserver.observe(element)
  },
  updated (element) {
    setMasonryGrid(element)
  },
  unmounted (element) {
    resizeObserver.unobserve(element)
  }
}
