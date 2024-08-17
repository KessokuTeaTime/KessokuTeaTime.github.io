export type ColorName = 'red' | 'blue' | 'pink' | 'yellow'
export type ColorOpacity = undefined | 'soft' | 'mute'

export type ColorCss = string | { name: ColorName; opacity?: ColorOpacity }

export interface Color {
  r: number
  g: number
  b: number
  a: number

  toRGBA(): string
}

export class Color implements Color {
  public r: number
  public g: number
  public b: number
  public a: number = 1

  public css: ColorCss | undefined = undefined

  public static red = this.fromCss({ name: 'red' })
  public static redSoft = this.fromCss({ name: 'red', opacity: 'soft' })
  public static redMute = this.fromCss({ name: 'red', opacity: 'mute' })

  public static blue = this.fromCss({ name: 'blue' })
  public static blueSoft = this.fromCss({ name: 'blue', opacity: 'soft' })
  public static blueMute = this.fromCss({ name: 'blue', opacity: 'mute' })

  public static pink = this.fromCss({ name: 'pink' })
  public static pinkSoft = this.fromCss({ name: 'pink', opacity: 'soft' })
  public static pinkMute = this.fromCss({ name: 'pink', opacity: 'mute' })

  public static yellow = this.fromCss({ name: 'yellow' })
  public static yellowSoft = this.fromCss({ name: 'yellow', opacity: 'soft' })
  public static yellowMute = this.fromCss({ name: 'yellow', opacity: 'mute' })

  public static black = Color.fromCss('--vt-c-black')
  public static white = Color.fromCss('--vt-c-white')

  constructor(
    r: number,
    g: number,
    b: number,
    a: number = 1,
    css: ColorCss | undefined = undefined
  ) {
    this.r = r
    this.g = g
    this.b = b
    this.a = a
    this.css = css
  }

  public static fromRGBA(r: number, g: number, b: number, a: number = 1): Color {
    return new Color(r, g, b, a)
  }

  public static fromCss(css: ColorCss): Color {
    return new Color(0, 0, 0, undefined, css)
  }

  public static fromHexARGB(hex: number): Color {
    const a = ((hex >> 24) & 0xff) / 0xff
    const r = (hex >> 16) & 0xff
    const g = (hex >> 8) & 0xff
    const b = hex & 0xff

    return Color.fromRGBA(r, g, b, a)
  }

  public static fromHexRGBA(hex: number): Color {
    const r = (hex >> 24) & 0xff
    const g = (hex >> 16) & 0xff
    const b = (hex >> 8) & 0xff
    const a = (hex & 0xff) / 0xff

    return Color.fromRGBA(r, g, b, a)
  }

  public static fromHex(hex: number): Color {
    return this.fromHexARGB(hex | 0xff000000)
  }

  public static fromString(str: string): Color {
    const isHex = /^#[0-9A-F]{6,8}$/i.test(str)

    if (isHex) {
      const hex = parseInt(str.replace('#', ''), 16)
      const hasAlpha = str.replace('#', '').length > 6
      if (hasAlpha) {
        return Color.fromHexRGBA(hex)
      } else {
        return Color.fromHex(hex)
      }
    } else {
      const hasAlpha = str.startsWith('rgba')
      const parts = str.replace(/.+\(/, '').replace(/\).+/, '').split(',')

      const r = parseInt(parts[0])
      const g = parseInt(parts[1])
      const b = parseInt(parts[2])

      if (hasAlpha) {
        const a = parseFloat(parts[3])
        return Color.fromRGBA(r, g, b, a)
      } else {
        return Color.fromRGBA(r, g, b)
      }
    }
  }

  public toNormalized(): Color {
    if (this.hasCss()) {
      return getVariableColor(this.toRawCss()!) || this
    } else {
      return this
    }
  }

  public toRawRGBA(): string {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`
  }

  public toRawCss(): string | undefined {
    if (this.hasCss()) {
      let result: string
      if (typeof this.css === 'string') {
        result = this.css
      } else {
        const prefix = '--color-tint'
        const suffix = this.css?.opacity ? `${this.css.opacity}` : undefined

        if (suffix) {
          result = `${prefix}-${this.css?.name}-${suffix}`
        } else {
          result = `${prefix}-${this.css?.name}`
        }
      }

      return result
    } else {
      return undefined
    }
  }

  public toRGBA(): string {
    return this.toNormalized().toRawRGBA()
  }

  public hasCss(): boolean {
    return this.css !== undefined
  }

  public withAlpha(a: number, normalize: boolean = true): Color {
    if (normalize) {
      return this.toNormalized().withAlpha(a, false)
    } else {
      return new Color(this.r, this.g, this.b, a, this.css)
    }
  }
}

export function getVariableColor(cssVarName: string): Color | undefined {
  const cssVar = getComputedStyle(document.documentElement).getPropertyValue(cssVarName)
  if (cssVar) {
    return Color.fromString(cssVar)
  }
}
