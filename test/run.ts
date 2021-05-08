import * as fs from 'fs'
import * as path from 'path'
import { getProfileSvg } from '../src'

fs.writeFileSync(path.resolve(__dirname, './profile.svg'), getProfileSvg(8583669))
