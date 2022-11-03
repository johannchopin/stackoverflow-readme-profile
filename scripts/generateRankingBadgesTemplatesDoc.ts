import * as fs from 'fs'
import * as path from 'path'

import { THEMES } from '../src/const'
import { renderRankingBadge, Theme } from '../src/templates'

const BADGES_DATA: { [key in Theme]: { tag: string, rank: number } } = {
  default: { tag: 'javascript', rank: 5 },
  dark: { tag: 'java', rank: 23 },
  cobalt: { tag: 'python', rank: 77 },
  monokai: { tag: 'rust', rank: 15 },
  graywhite: { tag: 'css', rank: 8 },
  hotdog: { tag: 'hadoop', rank: 42 }
}

let doc = '# Themes for the ranking badge \n';

(Object.keys(BADGES_DATA) as Theme[]).forEach(theme => {
  const { tag, rank } = BADGES_DATA[theme]

  const svgFileName = `${theme}.svg`
  doc += `## ${theme} \n ![profile theme ${theme}](./themes/${svgFileName}) \n`

  const svg = renderRankingBadge(tag, rank, THEMES[theme])

  console.log(`> Theme '${theme}' generated`)

  fs.writeFileSync(path.resolve(__dirname, `../docs/tags-league-ranking/themes/${svgFileName}`), svg)
})

fs.writeFileSync(path.resolve(__dirname, '../docs/tags-league-ranking/README.md'), doc)
