import {
  getUser as getStoredUser,
  getUserAvatar,
  shouldUpdateUserCache,
  storeAvatar,
  storeUser
} from './db/utils'
import fetchUser, { fetchUserAvatar } from './fetch'
import { User } from './types'

export const getAvatar = async (userId: number, avatarLink: string, shouldUpdate = false): Promise<string> => {
  const storedAvatar = await getUserAvatar(userId)

  if (shouldUpdate || !storedAvatar) {
    const avatar = await fetchUserAvatar(avatarLink)
    storeAvatar(userId, avatar)

    return avatar
  }

  return storedAvatar.base64
}

export const getUser = async (userId: number): Promise<User & {avatar: string}> => {
  const storedUser = await getStoredUser(userId)

  if (storedUser) {
    if (shouldUpdateUserCache(storedUser)) {
      const user = await fetchUser(userId)
      const shouldUpdateAvatar = user.avatarLink !== storedUser.avatarLink

      storeUser(user)
      return {
        ...user,
        avatar: await getAvatar(user.id, user.avatarLink, shouldUpdateAvatar)
      }
    }
    return {
      ...storedUser,
      avatar: await getAvatar(userId, storedUser.avatarLink),
      badges: {
        gold: storedUser.gold || 0,
        silver: storedUser.silver || 0,
        bronze: storedUser.bronze || 0
      }
    }
  }

  const user = await fetchUser(userId)

  storeUser(user)
  return {
    ...user,
    avatar: await getAvatar(user.id, user.avatarLink)
  }
}
