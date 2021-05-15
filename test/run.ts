import * as fs from 'fs'
import * as path from 'path'

import { getProfileSvg } from '../src'

getProfileSvg(8583669, { website: true, location: true, theme: 'default' }).then((svg) => {
  fs.writeFileSync(path.resolve(__dirname, './profile.svg'), svg)
}).catch((error) => {
  console.log(error)
})
