export interface ColorRGB {
  red: number
  green: number
  blue: number
}

export interface ColorHSL {
  hue: number
  saturation: number
  lightness: number
}

export const hexRegexp = /^#[A-Fa-f0-9]{6}$/

export function hexToRGB (hex: string): ColorRGB {
  if (!hexRegexp.test(hex)) return { red: 0, green: 0, blue: 0 }

  const red = parseInt(hex.slice(1, 3), 16)
  const green = parseInt(hex.slice(3, 5), 16)
  const blue = parseInt(hex.slice(5, 7), 16)

  return { red, green, blue }
}

export function rbgToHSL (rgb: ColorRGB): ColorHSL {
  let { red, green, blue } = rgb

  red /= 255
  green /= 255
  blue /= 255

  const cmin = Math.min(red, green, blue)
  const cmax = Math.max(red, green, blue)
  const delta = cmax - cmin

  let hue = 0
  let saturation = 0
  let lightness = 0

  if (delta === 0) hue = 0
  else if (cmax === red) hue = ((green - blue) / delta) % 6
  else if (cmax === green) hue = (blue - red) / delta + 2
  else hue = (red - green) / delta + 4

  hue = Math.round(hue * 60)

  if (hue < 0) hue += 360

  lightness = (cmax + cmin) / 2
  saturation = delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1))
  saturation = +(saturation * 100).toFixed(1)
  lightness = +(lightness * 100).toFixed(1)

  return { hue, saturation, lightness }
}

export function hexToHSL (hex: string): ColorHSL {
  return rbgToHSL(hexToRGB(hex))
}

export function getHSLString (hsl: ColorHSL): string {
  return `hsl(${hsl.hue},${hsl.saturation}%,${hsl.lightness}%)`
}

export function getRGBString (rgb: ColorRGB): string {
  return `rgb(${rgb.red},${rgb.green},${rgb.blue})`
}

export function lighten (hsl: ColorHSL, ratio: number): ColorHSL {
  const lightness = Math.min(hsl.lightness * (1 + ratio), 100)
  return { ...hsl, lightness }
}

export function darken (hsl: ColorHSL, ratio: number): ColorHSL {
  const lightness = hsl.lightness * (1 - ratio)
  return { ...hsl, lightness }
}
