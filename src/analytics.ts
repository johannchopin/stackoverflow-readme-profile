import { MS_IN_DAY, MS_IN_MONTH, MS_IN_WEEK } from './const'
import { User } from './db/entity/User'
import { getUsers } from './db/utils'

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
    else if (activeInWeek) analytics.week += 1
    else if (activeInMonth) analytics.month += 1
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
