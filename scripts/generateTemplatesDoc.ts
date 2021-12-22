import * as fs from 'fs'
import * as path from 'path'

import { Template, THEME_NAMES } from '../src/const'
import {
  renderProfile, renderProfileSmall, ProfileParams, ProfileSmallParams
} from '../src/templates'
import { isTemplateValid } from '../src/utils'

import dummyProfile from './dummyProfile.json'

const generateDocForTemplate = (
  template: Template,
  templateGenerator: (params: ProfileParams | ProfileSmallParams) => string
): void => {
  const docsPath = path.resolve(__dirname, `../docs/${template}/`)
  const docsThemePath = path.resolve(__dirname, `../docs/${template}/themes/`)

  let doc = `# Themes for the '${template}' template \n`

  if (!fs.existsSync(docsPath)) fs.mkdirSync(docsPath)
  if (!fs.existsSync(docsThemePath)) fs.mkdirSync(docsThemePath)

  THEME_NAMES.forEach((themeName) => {
    const svgFileName = `${themeName}.svg`
    doc += `## ${themeName} \n ![profile theme ${themeName}](./themes/${svgFileName}) \n`

    const svg = templateGenerator(dummyProfile as ProfileParams | ProfileSmallParams)

    console.log(`> Theme '${themeName}' generated`)

    fs.writeFileSync(path.resolve(__dirname, `../docs/${template}/themes/${svgFileName}`), svg)
  })

  fs.writeFileSync(path.resolve(__dirname, `../docs/${template}/README.md`), doc)
}

const templateName = process.argv[2] as Template
if (isTemplateValid(templateName)) {
  const templateGenerators: {[key in Template]: (params: ProfileParams | ProfileSmallParams) => string} = {
    profile: renderProfile,
    'profile-small': renderProfileSmall
  }

  generateDocForTemplate(templateName, templateGenerators[templateName])
} else {
  console.log(`Invalid theme '${templateName}' provided!`)
  process.exit(1)
}
