import { MS_IN_DAY } from './const'
import { getStoredUser, storeUser } from './db/utils'
import fetchUser from './fetch'
import { User } from './types'

export const getUser = async (userId: number): Promise<User> => {
  const storedUser = await getStoredUser(userId)

  if (storedUser) {
    const shouldUpdate = Date.now() >= storedUser.updatedAt.getTime() + MS_IN_DAY

    if (!shouldUpdate) {
      return {
        ...storedUser,
        avatar: '',
        badges: {
          gold: storedUser.gold || 0,
          silver: storedUser.silver || 0,
          bronze: storedUser.bronze || 0
        }
      }
    }
  }

  const user = await fetchUser(userId)

  storeUser(user)
  return user
}
