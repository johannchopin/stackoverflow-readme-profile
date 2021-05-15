import * as path from 'path'
import Handlebars from 'handlebars'

import { Badges } from './fetch'
import { getTemplate, replaceAll } from './utils'
import { Theme as ThemObject } from './index'

import defaultTheme from './themes/default.json'
import darkTheme from './themes/dark.json'
import cobaltTheme from './themes/cobalt.json'
import monokaiTheme from './themes/monokai.json'
import graywhiteTheme from './themes/graywhite.json'

export type Theme = 'default' | 'dark' | 'cobalt' | 'monokai' | 'graywhite'
export interface ErrorTemplateContext {
  lines: string[]
}
export interface ProfileTemplateContext {
  avatar: string
  username: string
  reputation: string
  badges: Badges
  location?: string
  website?: string
  theme: ThemObject
  badgesMarginLeft: number
  badgeSilverMarginLeft: number
  badgeBronzeMarginLeft: number
}
export interface ProfileParams extends Pick<ProfileTemplateContext,
  | 'avatar'
  | 'username'
  | 'reputation'
  | 'badges'
  | 'location'
  | 'website'
> {
  theme: Theme
}

export const THEMES: {[key in Theme]: ThemObject} = {
  default: defaultTheme,
  dark: darkTheme,
  cobalt: cobaltTheme,
  monokai: monokaiTheme,
  graywhite: graywhiteTheme
}
const LETTER_WIDTH = 9
const LETTER_MARGIN = 5

const PATH_TO_ERROR_TEMPLATE = path.resolve(__dirname, './templates/error.hbs')
const PATH_TO_TEMPLATE = path.resolve(__dirname, './templates/profile.hbs')
const PATH_TO_SO_ICON = path.resolve(__dirname, './templates/so-icon.hbs')
const PATH_TO_REP_BADGES_TEMPLATE = path.resolve(__dirname, './templates/reputation-badges.hbs')

const errorTemplate = getTemplate<ErrorTemplateContext>(PATH_TO_ERROR_TEMPLATE)

const soIconTemplate = getTemplate(PATH_TO_SO_ICON)
Handlebars.registerPartial('so-icon', soIconTemplate)

const repBadgesTemplate = getTemplate(PATH_TO_REP_BADGES_TEMPLATE)
Handlebars.registerPartial('rep-badges', repBadgesTemplate)

const profileTemplate = getTemplate<ProfileTemplateContext>(PATH_TO_TEMPLATE)

export const renderProfile = (params: ProfileParams): string => {
  const { reputation, badges } = params
  const { gold, silver, bronze } = badges

  const badgesMarginLeft = LETTER_WIDTH * reputation.length + LETTER_MARGIN
  let badgeSilverMarginLeft = (LETTER_WIDTH * silver.toString().length)
  if (gold > 0) badgeSilverMarginLeft += LETTER_MARGIN

  let badgeBronzeMarginLeft = (LETTER_WIDTH * bronze.toString().length)
  if (silver > 0) badgeBronzeMarginLeft += badgeSilverMarginLeft + 2 * LETTER_MARGIN

  return profileTemplate({
    ...params,
    theme: {
      ...defaultTheme,
      ...THEMES[params.theme]
    },
    badgesMarginLeft,
    badgeSilverMarginLeft,
    badgeBronzeMarginLeft
  })
}

export const renderError = (params: {error: string}): string => {
  const { error } = params

  // remove nested error title
  const errorMsg = replaceAll(error, 'Error: ', '')
  const lines = `Error: ${errorMsg}`.match(/.{1,45}/g) || [error]
  return errorTemplate({ lines })
}
