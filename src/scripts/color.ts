export type NamedColor = 'red' | 'blue' | 'pink' | 'yellow'
export type NamedOpacity = undefined | 'soft' | 'mute'

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
  public b: number = 0
  public a: number = 1

  public name: NamedColor | undefined = undefined
  public opacity: NamedOpacity | undefined = undefined

  public static red = this.fromName('red')
  public static redSoft = this.fromName('red', 'soft')
  public static redMute = this.fromName('red', 'mute')

  public static blue = this.fromName('blue')
  public static blueSoft = this.fromName('blue', 'soft')
  public static blueMute = this.fromName('blue', 'mute')

  public static pink = this.fromName('pink')
  public static pinkSoft = this.fromName('pink', 'soft')
  public static pinkMute = this.fromName('pink', 'mute')

  public static yellow = this.fromName('yellow')
  public static yellowSoft = this.fromName('yellow', 'soft')
  public static yellowMute = this.fromName('yellow', 'mute')

  public static getBlack = () => getVariableColor('--vt-c-black')!
  public static getWhite = () => getVariableColor('--vt-c-white')!

  constructor(
    r: number,
    g: number,
    b: number,
    a: number = 1,
    name: NamedColor | undefined = undefined,
    opacity: NamedOpacity | undefined = undefined
  ) {
    this.r = r
    this.g = g
    this.b = b
    this.a = a
    this.name = name
    this.opacity = opacity
  }

  public static fromRGBA(r: number, g: number, b: number, a: number = 1): Color {
    return new Color(r, g, b, a)
  }

  public static fromName(name: NamedColor, opacity: NamedOpacity = undefined): Color {
    return new Color(0, 0, 0, undefined, name, opacity)
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
    return this.fromHexARGB(hex)
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
    if (this.isNamed()) {
      return getVariableColor(this.toRawCss()!) || this
    } else {
      return this
    }
  }

  public toRawRGBA(): string {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`
  }

  public toRawCss(): string | undefined {
    if (this.isNamed()) {
      const prefix = '--color-tint'
      const suffix = this.opacity ? `${this.opacity}` : undefined
      let css: string
      if (suffix) {
        css = `${prefix}-${this.name}-${suffix}`
      } else {
        css = `${prefix}-${this.name}`
      }

      return css
    } else {
      return undefined
    }
  }

  public toRGBA(): string {
    return this.toNormalized().toRawRGBA()
  }

  public isNamed(): boolean {
    return this.name !== undefined
  }

  public withAlpha(a: number, normalize: boolean = true): Color {
    if (normalize) {
      return this.toNormalized().withAlpha(a, false)
    } else {
      return new Color(this.r, this.g, this.b, a, this.name, this.opacity)
    }
  }
}

export function getVariableColor(cssVarName: string): Color | undefined {
  const cssVar = getComputedStyle(document.documentElement).getPropertyValue(cssVarName)
  if (cssVar) {
    return Color.fromString(cssVar)
  }
}
