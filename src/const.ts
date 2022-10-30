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
export const THEMES: { [key in ThemeType]: Theme } = {
  default: defaultTheme,
  dark: darkTheme,
  cobalt: cobaltTheme,
  monokai: monokaiTheme,
  graywhite: graywhiteTheme,
  hotdog: hotdogTheme
}
export const THEME_NAMES: ThemeType[] = ['default', 'dark', 'cobalt', 'monokai', 'graywhite', 'hotdog']
export const MS_IN_SECONDS = 1000
export const SECONDS_IN_MIN = 60
export const MS_IN_DAY = MS_IN_SECONDS * SECONDS_IN_MIN * 60 * 24
export const MS_IN_WEEK = MS_IN_DAY * 7
export const MS_IN_MONTH = MS_IN_WEEK * 4

export const MIN_SCORE_TO_BE_IN_LEAGUE = 3
