import * as fs from 'fs'
import * as path from 'path'

import { getProfileSvg } from '../src'
import { Theme } from '../src/templates'

const THEMES: Theme[] = ['default', 'dark', 'cobalt', 'monokai', 'graywhite', 'hotdog']
const DOCS_PROFILE_PATH = path.resolve(__dirname, '../docs/profile/')
const DOCS_PROFILE_THEMES_PATH = path.resolve(__dirname, '../docs/profile/themes/')

let doc = '# Profile themes \n'

if (!fs.existsSync(DOCS_PROFILE_PATH)) fs.mkdirSync(DOCS_PROFILE_PATH)
if (!fs.existsSync(DOCS_PROFILE_THEMES_PATH)) fs.mkdirSync(DOCS_PROFILE_THEMES_PATH)

THEMES.forEach((theme) => {
  const svgFileName = `${theme}.svg`
  doc += `## ${theme} \n ![profile theme ${theme}](./themes/${svgFileName}) \n`
  getProfileSvg(8583669, { website: true, location: true, theme }).then((svg) => {
    fs.writeFileSync(path.resolve(__dirname, `../docs/profile/themes/${svgFileName}`), svg)
  })
})

fs.writeFileSync(path.resolve(__dirname, '../docs/profile/README.md'), doc)
