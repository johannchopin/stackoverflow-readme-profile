import { initDatabase } from '../../db/init'
import { computeTagsPercentageScale } from '../computeTagsPercentageScale'

const run = async (): Promise<void> => {
  await initDatabase()
  await computeTagsPercentageScale()
  process.exit()
}

run()
