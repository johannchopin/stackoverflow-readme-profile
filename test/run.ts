import * as fs from 'fs'
import * as path from 'path'

import { getProfileSvg } from '../src'

getProfileSvg(193567487, (svg) => {
  if (svg) {
    fs.writeFileSync(path.resolve(__dirname, './profile.svg'), svg)
  }
})
