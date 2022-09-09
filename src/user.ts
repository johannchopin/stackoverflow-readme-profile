import {
  createUser,
  getUser as getStoredUser,
  getUserAvatar,
  shouldUpdateUserCache,
  storeAvatar,
  updateUser
} from './db/utils'
import { fetchUserAvatar, fetchUser } from './fetch'
import { User } from './types'
import { getResizedBase64 } from './utils'

export const getAvatar = async (
  userId: number,
  avatarLink: string,
  shouldUpdate = false,
  useCache = true
): Promise<string> => {
  const storedAvatar = useCache ? await getUserAvatar(userId) : undefined

  if (shouldUpdate || !storedAvatar) {
    let avatar = await fetchUserAvatar(avatarLink)
    avatar = await getResizedBase64(avatar, 100, 100) // resize avatar to smaller one
    if (useCache) storeAvatar(userId, avatar)

    return avatar
  }

  return storedAvatar.base64
}

export const getUser = async (
  userId: number,
  useCache: boolean = true
): Promise<(User & { avatar: string }
) | undefined> => {
  const storedUser = useCache ? await getStoredUser(userId) : undefined

  if (storedUser) {
    if (shouldUpdateUserCache(storedUser)) {
      const user = await fetchUser(userId)
      if (!user) return undefined
      const shouldUpdateAvatar = user.avatarLink !== storedUser.avatarLink

      updateUser(user)
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
  if (!user) return undefined

  if (useCache) createUser(user)
  return {
    ...user,
    avatar: await getAvatar(user.id, user.avatarLink, false, useCache)
  }
}
