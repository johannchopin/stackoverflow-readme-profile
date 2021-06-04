import * as fs from 'fs'
import * as path from 'path'

import { getProfileSvg } from '../src'
import { Template, THEME_NAMES } from '../src/const'
import { isTemplateValid } from '../src/utils'

const generateDocForTemplate = (template: Template): void => {
  const docsPath = path.resolve(__dirname, `../docs/${template}/`)
  const docsThemePath = path.resolve(__dirname, `../docs/${template}/themes/`)

  let doc = `# Themes for the '${template}' template \n`

  if (!fs.existsSync(docsPath)) fs.mkdirSync(docsPath)
  if (!fs.existsSync(docsThemePath)) fs.mkdirSync(docsThemePath)

  THEME_NAMES.forEach((theme) => {
    const svgFileName = `${theme}.svg`
    doc += `## ${theme} \n ![profile theme ${theme}](./themes/${svgFileName}) \n`
    getProfileSvg(8583669, template, { website: true, location: true, theme }, false).then((svg) => {
      fs.writeFileSync(path.resolve(__dirname, `../docs/${template}/themes/${svgFileName}`), svg)
    })
  })

  fs.writeFileSync(path.resolve(__dirname, `../docs/${template}/README.md`), doc)
}

if (isTemplateValid(process.argv[2])) {
  generateDocForTemplate(process.argv[2] as Template)
} else {
  console.log('Invalid theme provided!')
  process.exit(1)
}
