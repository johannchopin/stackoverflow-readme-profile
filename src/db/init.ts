import { config } from 'dotenv'
import { createConnection } from 'typeorm'

import { Logger } from '../Logger'
import { PopularTag } from './entity/PopularTag'
import { User } from './entity/User'
import { Avatar } from './entity/Avatar'
import { Log } from './entity/Log'
import { ScoreAmountByTag } from './entity/ScoreAmountByTag'

export const connect = async (): Promise<void> => {
  config()

  await createConnection({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: ['error'],
    entities: [User, Avatar, PopularTag, Log, ScoreAmountByTag]
  }).catch(error => {
    Logger.log('Data Access Error: ')
    Logger.log(error)
    process.exit()
  })
}

export const initDatabase = async (): Promise<void> => {
  await connect()

  Logger.log('Database connected')
  // await initPopularTagsTable()
}
