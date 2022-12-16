import { getManager, MoreThanOrEqual } from 'typeorm'
import { MS_IN_DAY, MS_IN_MONTH, MS_IN_WEEK } from './const'
import { User } from './db/entity/User'
import { UserRankByTag } from './db/entity/UserRankByTag'
import { getTags, getUsers } from './db/utils'

interface ActiveUsersAnalytics {
  month: number
  week: number
  day: number
}
interface Analytics {
  users: {
    amount: number
    activity: ActiveUsersAnalytics
  }
}

const getActiveUsersAnalytics = (users: User[]): ActiveUsersAnalytics => {
  let analytics: ActiveUsersAnalytics = {
    month: 0,
    week: 0,
    day: 0
  }

  users.forEach((user) => {
    const now = Date.now()
    const lastUpdate = user.updatedAt.getTime()

    const activeInMonth = lastUpdate > (now - MS_IN_MONTH)
    const activeInWeek = lastUpdate > (now - MS_IN_WEEK)
    const activeInDay = lastUpdate > (now - MS_IN_DAY)

    if (activeInDay) analytics.day += 1
    if (activeInWeek) analytics.week += 1
    if (activeInMonth) analytics.month += 1
  })

  return analytics
}

export const getAnalytics = async (): Promise<Analytics> => {
  const users = await getUsers()

  return {
    users: {
      amount: users.length,
      activity: getActiveUsersAnalytics(users)
    }
  }
}

const getLastWeekUsersAmountForTag = async (tag: string): Promise<number> => {
  const manager = getManager()
  return (await manager.getRepository(UserRankByTag).find({
    where: {
      tag,
      updatedAt: MoreThanOrEqual(new Date(Date.now() - 604800000)) // user since last week
    }
  })).length
}

export const getTagsLeagueAnalytics = async (): Promise<Record<string, number>> => {
  const tags = await (await getTags()).map(tag => tag.name)

  const usersAmountByTag: Record<string, number> = {}

  await Promise.all(tags.map(async (tag) => {
    usersAmountByTag[tag] = await getLastWeekUsersAmountForTag(tag)
  }))

  return usersAmountByTag
}
