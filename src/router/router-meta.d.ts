import type { Color } from '@/scripts/color'

export {}

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    description?: string
    themeColor?: Color | { light: Color; dark: Color }
  }
}
