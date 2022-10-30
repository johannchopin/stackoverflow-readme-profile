import { config } from 'dotenv'
import { createConnection } from 'typeorm'

import { Logger } from '../Logger'
import { Tag } from './entity/Tag'
import { User } from './entity/User'
import { Avatar } from './entity/Avatar'
import { Log } from './entity/Log'
import { ScoreAmountByTag } from './entity/ScoreAmountByTag'
import { ScorePercentileByTag } from './entity/ScorePercentileByTag'
import { storeLog } from './utils'
import { UserRankByTag } from './entity/UserRankByTag'
import { LogType } from './constants'

export const connect = async (): Promise<void> => {
  config()

  const entities = [
    User,
    Avatar,
    Tag,
    Log,
    ScoreAmountByTag,
    ScorePercentileByTag,
    UserRankByTag
  ]

  await createConnection({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: ['error'],
    entities
  }).catch(error => {
    Logger.log('Data Access Error: ')
    Logger.log(error)
    process.exit()
  })
}

export const initDatabase = async (): Promise<void> => {
  await connect()

  storeLog(LogType.SERVER_START)
  Logger.log('Database connected')
}
