import { getMongoManager } from 'typeorm'
import { MS_IN_DAY } from '../const'

import { User as UserType } from '../types'
import { Avatar } from './entity/Avatar'
import { User } from './entity/User'

export const getUser = async (userId: number): Promise<User | undefined> => {
  try {
    return getMongoManager().findOne(User, { id: userId })
  } catch (error) {
    return undefined
  }
}

export const shouldUpdateUserCache = async (user: User): Promise<boolean> => {
  return Date.now() >= user.updatedAt.getMilliseconds() + MS_IN_DAY
}

export const getUserAvatar = async (userId: number): Promise<Avatar | undefined> => {
  return getMongoManager().findOne(Avatar, { id: userId })
}

export const storeAvatar = async (userId: number, avatarBase64: string): Promise<void> => {
  const manager = getMongoManager()

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
  const manager = getMongoManager()

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
    // TODO: Fix no update in db
    manager.update(User, { id: userToInsert.id }, user)
  } else {
    manager.save(user)
  }
}

export const updateUser = async (userToInsert: UserType): Promise<void> => {
  return storeUser(userToInsert, 'update')
}

export const createUser = async (userToInsert: UserType): Promise<void> => {
  return storeUser(userToInsert, 'create')
}
