export type NamedColor = 'red' | 'blue' | 'pink' | 'yellow'
export type NamedOpacity = undefined | 'soft' | 'mute'

export class Color {
  public r: number
  public g: number
  public b: number = 0
  public a: number = 1

  public name: NamedColor | undefined = undefined
  public opacity: NamedOpacity | undefined = undefined

  public static red = this.fromName('red')
  public static softRed = this.fromName('red', 'soft')
  public static muteRed = this.fromName('red', 'mute')

  public static blue = this.fromName('blue')
  public static softBlue = this.fromName('blue', 'soft')
  public static muteBlue = this.fromName('blue', 'mute')

  public static pink = this.fromName('pink')
  public static softPink = this.fromName('pink', 'soft')
  public static mutePink = this.fromName('pink', 'mute')

  public static yellow = this.fromName('yellow')
  public static softYellow = this.fromName('yellow', 'soft')
  public static muteYellow = this.fromName('yellow', 'mute')

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

  public static fromHex(hex: string): Color {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    const a = parseInt(hex.slice(7, 9), 16) || 1
    return new Color(r, g, b, a)
  }

  public toCss(): string {
    if (this.isNamed()) {
      const prefix = '--color-tint'
      const suffix = this.opacity ? `${this.opacity}` : undefined
      let css: string
      if (suffix) {
        css = `${prefix}-${this.name}-${suffix}`
      } else {
        css = `${prefix}-${this.name}`
      }

      return `var(${css})`
    } else {
      return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`
    }
  }

  public isNamed(): boolean {
    return this.name !== undefined
  }

  public withAlpha(a: number): Color {
    return new Color(this.r, this.g, this.b, a, this.name, this.opacity)
  }
}
