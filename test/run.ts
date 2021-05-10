import * as fs from 'fs'
import * as path from 'path'

import { getProfileSvg } from '../src'

getProfileSvg(8583669).then((svg) => {
  fs.writeFileSync(path.resolve(__dirname, './profile.svg'), svg)
}).catch((error) => {
  console.log(error)
})
