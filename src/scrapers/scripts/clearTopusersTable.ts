import { getManager } from 'typeorm'
import { Logger } from '../../Logger'
import { TopUser } from '../../db/entity/TopUser'
import { connect } from '../../db/init'

const run = async (): Promise<void> => {
  await connect()
  await (getManager().getRepository(TopUser)).clear()

  Logger.log('Table cleared')
  process.exit()
}

if (require.main === module) {
  run()
}
