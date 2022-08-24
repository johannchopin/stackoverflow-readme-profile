import { getManager } from 'typeorm'
import { MS_IN_DAY } from '../const'
import scrapePopularTags from '../scrapers/scrapePopularTags'

import { User as UserType } from '../types'
import { Avatar } from './entity/Avatar'
import { PopularTag } from './entity/PopularTag'
import { User } from './entity/User'

export const getUsers = async (): Promise<User[]> => {
  return getManager().find(User)
}

export const getUser = async (userId: number): Promise<User | undefined> => {
  try {
    return getManager().findOne(User, userId)
  } catch (error) {
    return undefined
  }
}

export const shouldUpdateUserCache = (user: User): boolean => {
  return Date.now() >= new Date(user.updatedAt).getTime() + MS_IN_DAY
}

export const getUserAvatar = async (userId: number): Promise<Avatar | undefined> => {
  return getManager().findOne(Avatar, { id: userId })
}

export const storeAvatar = async (userId: number, avatarBase64: string): Promise<void> => {
  const manager = getManager()

  const existingAvatar = await getUserAvatar(userId)

  const avatar = new Avatar()
  avatar.id = userId
  avatar.base64 = avatarBase64

  if (existingAvatar) {
    await manager.update(Avatar, { id: userId }, avatar)
  } else {
    await manager.save(avatar)
  }
}

export const storeUser = async (userToInsert: UserType, action: 'create' | 'update'): Promise<void> => {
  const manager = getManager()

  const user = new User()

  user.id = userToInsert.id
  user.username = userToInsert.username
  user.reputation = userToInsert.reputation
  user.gold = userToInsert.badges.gold
  user.silver = userToInsert.badges.silver
  user.bronze = userToInsert.badges.bronze
  user.location = userToInsert.location
  user.website = userToInsert.website
  user.avatarLink = userToInsert.avatarLink

  if (action === 'update') {
    user.updatedAt = new Date()
  }

  manager.save(user)
}

export const updateUser = async (userToInsert: UserType): Promise<void> => {
  return storeUser(userToInsert, 'update')
}

export const createUser = async (userToInsert: UserType): Promise<void> => {
  return storeUser(userToInsert, 'create')
}

export const getPopularTags = async (): Promise<PopularTag[]> => {
  return getManager().find(PopularTag)
}

export const resetPopularTags = async (): Promise<PopularTag[]> => {
  const manager = getManager()

  manager.getRepository(PopularTag).clear()

  const fetchedTags = await scrapePopularTags()

  const tags: PopularTag[] = fetchedTags.map((fetchedTag, index) => {
    const tag = new PopularTag()
    tag.id = index
    tag.name = fetchedTag
    return tag
  })

  manager.save(tags)
  return tags
}
