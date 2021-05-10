import * as path from 'path'
import Handlebars from 'handlebars'

import { Badges } from './fetch'
import { getTemplate } from './utils'
import { Theme } from './index'

export interface ProfileTemplateContext {
  avatar: string
  username: string
  reputation: string
  badges: Badges
  location?: string
  website?: string
  theme: Theme
}

const PATH_TO_TEMPLATE = path.resolve(__dirname, './templates/profile.hbs')
const PATH_TO_SO_ICON = path.resolve(__dirname, './templates/so-icon.hbs')

const soIconTemplate = getTemplate(PATH_TO_SO_ICON)
Handlebars.registerPartial('so-icon', soIconTemplate)
const profileTemplate = getTemplate<ProfileTemplateContext>(PATH_TO_TEMPLATE)

export default profileTemplate
