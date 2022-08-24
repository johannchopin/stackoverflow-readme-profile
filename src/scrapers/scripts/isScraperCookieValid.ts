import { getManager } from 'typeorm'
import { Auth } from '../Auth'
import { initDatabase } from '../../db/init'

const run = async (): Promise<void> => {
  await initDatabase()
  const manager = await getManager()

  const auth = new Auth(manager)
  await auth.init()

  console.log(await auth.isValid())
  process.exit()
}

if (require.main === module) {
  run()
}
