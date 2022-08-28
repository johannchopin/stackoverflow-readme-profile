import { getManager } from 'typeorm'
import { PopularTag } from '../db/entity/PopularTag'
import { TopUser } from '../db/entity/TopUser'
import { Logger } from '../Logger'
import { ApiService } from './ApiService'
import { Auth } from './Auth'

const insertTopUsersInTable = async (tag: string, users: [number, number][]): Promise<void> => {
  const manager = getManager()
  const topUsers: TopUser[] = []

  users.forEach(user => {
    const topUser = new TopUser()
    topUser.userId = user[0]
    topUser.tag = tag
    topUser.score = user[1]

    topUsers.push(topUser)
  })

  await manager.save(topUsers, { chunk: 1000 })
  Logger.log(`Store top users for tag: ${tag}`)
}

export const computeTagsPercentageScale = async (cookie: string, signal: AbortSignal): Promise<void> => {
  Logger.log('Start tags scraping')
  const manager = getManager()

  const auth = await new Auth(cookie).init()
  const isAuthenticated = await auth.isValid()

  if (!isAuthenticated) process.exit(1)

  const api = new ApiService(auth)

  const tags = (await manager.find(PopularTag, {
    select: ['name']
  })).map(entity => entity.name)

  await manager.getRepository(TopUser).clear()
  Logger.log('top user table cleared')

  // eslint-disable-next-line no-restricted-syntax
  for (const tag of tags) {
    if (!signal.aborted) {
      // eslint-disable-next-line no-await-in-loop
      let topUsers = await api.getTopUsersByTag(decodeURIComponent(tag), signal)

      if (!signal.aborted && topUsers) {
        // eslint-disable-next-line no-await-in-loop
        await insertTopUsersInTable(tag, topUsers)
      }
    }
  }

  if (signal.aborted) signal.dispatchEvent(new Event('aborted'))
}
