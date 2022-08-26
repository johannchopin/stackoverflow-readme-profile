import * as fs from 'fs'
import Handlebars from 'handlebars'
import { minify } from 'html-minifier'
import * as jimp from 'jimp'

import { TEMPLATES, THEMES } from './const'

export const getUserReputation = (rep: number): string => {
  if (rep >= 1_000_000) return `${(Math.round(rep / 100_000) / 10).toFixed(1)}m`
  if (rep >= 100_000) return `${Math.round(rep / 1000)}k`
  if (rep >= 10_000) return `${(Math.round(rep / 100) / 10).toFixed(1)}k`
  if (rep >= 1000) return (rep / 1000).toFixed(3).replace('.', ',')

  return rep.toString()
}

export const getTemplate = <T = {}>(filePath: string): Handlebars.TemplateDelegate<T> => {
  const content = fs.readFileSync(filePath, 'utf-8')

  return Handlebars.compile<T>(content)
}

export const isThemeValid = (theme: string): boolean => {
  // @ts-ignore
  return THEMES[theme] !== undefined
}

export const replaceAll = (str: string, find: string, replace: string): string => {
  return str.split(find).join(replace)
}

export const getTruncatedText = (text:string, truncAtN: number): string => {
  if (text.length > truncAtN) {
    return `${text.slice(0, truncAtN - 3)}...`
  }

  return text
}

export const isTemplateValid = (templateName: string): boolean => {
  // @ts-ignore
  return TEMPLATES.includes(templateName)
}

export const getResizedBase64 = async (
  base64: string,
  width: number,
  height: number
): Promise<string> => {
  const imageBuffer = Buffer.from(base64.replace('data:image/png;base64,', ''), 'base64')
  const image = await jimp.read(imageBuffer)
  return image.resize(width, height).getBase64Async(jimp.MIME_PNG)
}

const getStringWithoutLineBreaks = (string: string): string => {
  return string.replace(/\r?\n|\r/g, '')
}

export const getMinified = (htmlString: string): string => {
  htmlString = minify(htmlString, {
    // minifyCSS: true,
    ignoreCustomFragments: [/{{[{]?(.*?)[}]?}}/],
    collapseWhitespace: true
  })
  htmlString = replaceAll(htmlString, '   ', '')
  htmlString = replaceAll(htmlString, '  ', '')
  return getStringWithoutLineBreaks(htmlString)
}

export const sleep = (ms: number): Promise<never> => {
  return new Promise(res => setTimeout(res, ms))
}
