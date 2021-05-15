import * as fs from 'fs'
import Handlebars from 'handlebars'
import { minify } from 'html-minifier'
import { THEMES } from './templates'

export const getUserReputation = (rep: number): string => {
  if (rep >= 1_000_000) return `${(Math.round(rep / 100_000) / 10).toFixed(1)}m`
  if (rep >= 100_000) return `${Math.round(rep / 1000)}k`
  if (rep >= 10_000) return `${(Math.round(rep / 100) / 10).toFixed(1)}k`
  if (rep >= 1000) return (rep / 1000).toFixed(3).replace('.', ',')

  return rep.toString()
}
export const getTemplate = <T = {}>(filePath: string): Handlebars.TemplateDelegate<T> => {
  const content = fs.readFileSync(filePath, 'utf-8')
  const templateString = minify(content, {
    // minifyCSS: true,
    ignoreCustomFragments: [/{{[{]?(.*?)[}]?}}/],
    collapseWhitespace: true
  })

  return Handlebars.compile<T>(templateString)
}
export const isThemeValid = (theme: string): boolean => {
  // @ts-ignore
  return THEMES[theme] !== undefined
}
