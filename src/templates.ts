import * as path from 'path'
import Handlebars from 'handlebars'

import { Badges } from './fetch'
import { getTemplate, getTruncatedText, replaceAll } from './utils'
import { Theme as ThemeObject, THEMES } from './const'

import defaultTheme from './themes/default.json'

export type Theme = 'default' | 'dark' | 'cobalt' | 'monokai' | 'graywhite' | 'hotdog'
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
  theme: ThemeObject
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
export type ProfileSmallTemplateContext = Omit<ProfileTemplateContext, 'website' | 'location'>
export type ProfileSmallParams = Omit<ProfileParams, 'website' | 'location'>

const LETTER_WIDTH = 9
const LETTER_MARGIN = 12

const PATH_TO_GLOBAL_STYLES_TEMPLATE = path.resolve(__dirname, './templates/global.css.hbs')
const PATH_TO_ERROR_TEMPLATE = path.resolve(__dirname, './templates/error.hbs')
const PATH_TO_PROFILE_TEMPLATE = path.resolve(__dirname, './templates/profile.hbs')
const PATH_TO_PROFILE_SMALL_TEMPLATE = path.resolve(__dirname, './templates/profile-small.hbs')
const PATH_TO_SO_ICON = path.resolve(__dirname, './templates/so-icon.hbs')
const PATH_TO_REP_BADGES_TEMPLATE = path.resolve(__dirname, './templates/reputation-badges.hbs')

const errorTemplate = getTemplate<ErrorTemplateContext>(PATH_TO_ERROR_TEMPLATE)

Handlebars.registerHelper('truncatedText', getTruncatedText)

const soIconTemplate = getTemplate(PATH_TO_SO_ICON)
Handlebars.registerPartial('so-icon', soIconTemplate)

const repBadgesTemplate = getTemplate(PATH_TO_REP_BADGES_TEMPLATE)
Handlebars.registerPartial('rep-badges', repBadgesTemplate)

const globalStylesTemplate = getTemplate<{theme: ThemeObject}>(PATH_TO_GLOBAL_STYLES_TEMPLATE)
const profileTemplate = getTemplate<ProfileTemplateContext>(PATH_TO_PROFILE_TEMPLATE)
const profileSmallTemplate = getTemplate<ProfileSmallTemplateContext>(PATH_TO_PROFILE_SMALL_TEMPLATE)

export const renderProfileHelper = (params: ProfileParams, template: Handlebars.TemplateDelegate): string => {
  const { reputation, badges } = params
  const { gold, silver } = badges
  const theme = {
    ...defaultTheme,
    ...THEMES[params.theme]
  }

  const badgesMarginLeft = LETTER_WIDTH * reputation.length + LETTER_MARGIN
  let badgeSilverMarginLeft = (LETTER_WIDTH * gold.toString().length)
  if (gold > 0) badgeSilverMarginLeft += LETTER_MARGIN

  let badgeBronzeMarginLeft = (LETTER_WIDTH * silver.toString().length)
  if (silver > 0) badgeBronzeMarginLeft += badgeSilverMarginLeft + LETTER_MARGIN

  Handlebars.registerPartial('global-styles', () => globalStylesTemplate({ theme }))

  return template({
    ...params,
    theme,
    badgesMarginLeft,
    badgeSilverMarginLeft,
    badgeBronzeMarginLeft
  })
}

export const renderProfile = (params: ProfileParams): string => {
  return renderProfileHelper(params, profileTemplate)
}

export const renderProfileSmall = (params: ProfileSmallParams): string => {
  return renderProfileHelper(params, profileSmallTemplate)
}

export const renderError = (params: {error: string}): string => {
  const { error } = params

  // remove nested error title
  const errorMsg = replaceAll(error, 'Error: ', '')
  const lines = `Error: ${errorMsg}`.match(/.{1,45}/g) || [error]
  return errorTemplate({ lines })
}
