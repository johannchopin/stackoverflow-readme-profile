import { Theme as ThemeType } from './templates'

import defaultTheme from './themes/default.json'
import darkTheme from './themes/dark.json'
import cobaltTheme from './themes/cobalt.json'
import monokaiTheme from './themes/monokai.json'
import graywhiteTheme from './themes/graywhite.json'
import hotdogTheme from './themes/hotdog.json'

export interface Theme {
  colorBg: string
  colorPrimary: string,
  colorSoIcon?: string
}

export type Template = 'profile' | 'profile-small'
export const TEMPLATES: Template[] = ['profile', 'profile-small']
export const THEMES: {[key in ThemeType]: Theme} = {
  default: defaultTheme,
  dark: darkTheme,
  cobalt: cobaltTheme,
  monokai: monokaiTheme,
  graywhite: graywhiteTheme,
  hotdog: hotdogTheme
}
export const THEME_NAME: ThemeType[] = ['default', 'dark', 'cobalt', 'monokai', 'graywhite', 'hotdog']
export const SECONDS_IN_MIN = 60
