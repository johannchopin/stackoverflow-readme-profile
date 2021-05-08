import * as fs from 'fs'
import * as path from 'path'
import Handlebars from 'handlebars'
import { minify } from 'html-minifier'

export interface Badges {
  gold: number
  silver: number
  bronze: number
}
export interface ProfileTemplateContext {
  username: string
  reputation: string
  badges: Badges
  location?: string
  website?: string
}

const PATH_TO_TEMPLATE = path.resolve(__dirname, './profile-template.hbs')

const content = fs.readFileSync(PATH_TO_TEMPLATE, 'utf-8')
const templateString = minify(content, {
  // minifyCSS: true,
  ignoreCustomFragments: [/{{[{]?(.*?)[}]?}}/],
  collapseWhitespace: true
})

const template = Handlebars.compile<ProfileTemplateContext>(templateString)

export default template
